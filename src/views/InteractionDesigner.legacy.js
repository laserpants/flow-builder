import BBEventProxy from '@/lib/mixins/BBEventProxy'

export default {
  mixins: [BBEventProxy],

  data() {
    return {
      events: {
        'click .tree-add-block': 'addNewBlock',
        'click .tree-delete-block': 'deleteBlock',
        'click .tree-duplicate-block': 'duplicateSelectedBlock',
        'click .block-item-target': 'handleSelectBlock',
        'click .tree-block-container': 'deselectBlocks',

        'click .tree-toggle-editable': 'toggleEditable',
      },
    }
  },

  mounted() {
    // Start up running the app
    // This in turn calls the jsPlumb initial setup
    // And binds events related to the primary Tree workspace
    // const {jsPlumb, app} = global
    // jsPlumb.ready(this.initializeAll)

    // Handles delete keydown event on a selected block.
    this.bindBlockDeleteOnKeydown()
    this.bindUndoBlockDeleteOnKeydown()

    // Queue up the repeating save function
    _.delay(this.saveTreeRepeater, app.ui.saveTimer * 1000)

    // Bind a handler to watch for page exits when the page is unsaved
    // window.onbeforeunload = function () {
    $(window)
      .on('beforeunload', () => {
        if (builder.$store.getters.isEditable && builder.$store.getters.hasChanges) {
          return 'You have unsaved changes. Are you sure you want to leave this page?'
        }
      })

    console.log('InteractionDesigner.legacy initialized')
  },

  methods: {
    initializeAll() {
      // this.initializeJsPlumb()
      // this.resetJsPlumbBindings()
      app.tree.updateFloipAlert()
    },

    bindBlockDeleteOnKeydown() {
      const {window, $, app} = global

      $(window)
        .keydown((e) => {
          if (!app.ui.isEditable) {
            return
          }

          const tag = e.target.tagName.toLowerCase()

          // If we select a block and press either ctrl-delete, ctrl key-backspace, cmd-delete or cmd-backspace
          if ((e.metaKey || e.ctrlKey) && (e.keyCode === 46 || e.keyCode === 8)
            && $('.tree-selected-block').length
            // Make sure we do not delete a selected block when
            // deleting text in an input or textbox.
            && tag !== 'input'
            && tag !== 'textarea') {
            e.preventDefault()
            this.deleteBlock()
          }
        })
    },

    bindUndoBlockDeleteOnKeydown() {
      const {window, $, app} = global

      $(window)
        .keydown((e) => {
          if (!app.ui.isEditable) {
            return
          }

          // Save name of element.
          const tag = e.target.tagName.toLowerCase()

          // We allow undo only if we have a mostRecentlyDeletedBlock.
          // This limits undo to just one level.
          // Also make sure we're not undoing delete block when we're
          // editing some text.
          if (e.keyCode === 90
            && e.ctrlKey
            && app.ui.mostRecentlyDeletedBlock
            && tag !== 'input'
            && tag !== 'textarea') {
            this.undoDeleteBlock()
          }
        })
    },

    // initializeJsPlumb() {
    //   const {app} = global
    //   app.jsPlumb = app.jsPlumbFactory()
    // },

    // attachJsPlumbEventListeners: _.once(function () {
    //   app.jsPlumb.attachEventListeners();
    // }),

    addNewBlock(e) {
      // Prevent default to avoid scrolling-up from dropdown buttons.
      // per http://stackoverflow.com/a/6487346
      e.preventDefault()

      let startingXPosition = 50
      let startingYPosition = 50
      let blockData

      const selectedBlock = app.tree.getBlock(app.ui.selectedBlock)
      if (selectedBlock && selectedBlock.uiData) {
        if (selectedBlock.uiData.xPosition) {
          startingXPosition = selectedBlock.uiData.xPosition
        }

        if (selectedBlock.uiData.yPosition) {
          // Need to add some clearance to get past the selected block
          startingYPosition = selectedBlock.uiData.yPosition + 150
        }
      } else if (app.tree.getBlockKeys().length > 0) {
        startingYPosition = app.tree.getTallestBlockPosition(150)
      }

      // Thanks to
      // http://stackoverflow.com/a/5683169
      const type = $(e.currentTarget)
        .data('block-type')
      const numConnections = $(e.currentTarget)
        .data('default-num-connections')

      blockData = _.extend({}, _.get(this.$store.state.trees.ui.blockDefaults, type, {}))

      // Set initial values based on UI parameters
      blockData.type = type
      blockData.uiData = blockData.uiData || {}
      blockData.uiData.xPosition = startingXPosition
      blockData.uiData.yPosition = startingYPosition
      blockData.uiData.numConnections = numConnections

      // automatically enable the autogen feature for content types that should autogen
      if (app.tree.getEnabledLanguages().length > 0) {
        blockData.smsAutogenLangs = blockData.smsAutogenLangs || []
        blockData.smsAutogenLangs.push(+app.tree.getEnabledLanguages()[0])

        blockData.ussdAutogenLangs = blockData.ussdAutogenLangs || []
        blockData.ussdAutogenLangs.push(+app.tree.getEnabledLanguages()[0])

        blockData.socialAutogenLangs = blockData.socialAutogenLangs || []
        blockData.socialAutogenLangs.push(+app.tree.getEnabledLanguages()[0])
      }

      if (type == 'ContentTypeBranchBlock') {
        blockData = this.processNewContentTypeBranchBlock(blockData)
      }

      // this.initializeJsPlumbValidateCodeBlock(blockData)

      if (type == 'WebhookBlock' || type == 'WebhookContentBlock') {
        this.setWebhookConfigIfPossible(blockData)
      }

      blockData = _.merge(_.cloneDeep(this.$store.state.trees.ui.commonBlockDefaults), blockData)
      app.tree.addBlock(blockData)
      // this.resetJsPlumbBindings(false)

      this.$store.dispatch('discoverTallestBlockForDesignerWorkspaceHeight', {aboveTallest: true})

      app.ui.change('New block added.')
    },

    processNewContentTypeBranchBlock(blockData) {
      console.log('Inside processNewContentTypeBranchBlock')
      console.log(blockData)

      let numConnections = 0
      const outputTypes = []
      const outputNames = []

      if (app.tree.get('details').hasVoice) {
        numConnections += 1
        outputTypes.push(1)
        outputNames.push('trees.output-voice')
      }
      if (app.tree.get('details').hasSms) {
        numConnections += 1
        outputTypes.push(2)
        outputNames.push('trees.output-sms')
      }
      if (app.tree.get('details').hasClipboard) {
        numConnections += 1
        outputTypes.push(3)
        outputNames.push('trees.output-clipboard')
      }
      if (app.tree.get('details').hasUssd) {
        numConnections += 1
        outputTypes.push(4)
        outputNames.push('trees.output-ussd')
      }
      if (app.tree.get('details').hasSocial) {
        numConnections += 1
        outputTypes.push(10)
        // Todo how can we push all social content types without needing to add a new number for each social network?
        outputTypes.push(15)
        outputNames.push('trees.output-social')
      }

      blockData.uiData.numConnections = numConnections
      blockData.uiData.outputNames = outputNames
      blockData.customData.outputTypes = outputTypes

      return blockData
    },
    initializeJsPlumbValidateCodeBlock(blockData) {
      if (blockData.type === 'ValidateCodeBlock') {
        if (app.tree.get('details').hasClipboard) {
          blockData.uiData.numConnections = 4
          blockData.uiData.outputNames[3] = 'trees.offline'
        } else {
          blockData.uiData.numConnections = 3
          // Keep only the first three items in the array
          blockData.uiData.outputNames.splice(3, 1)
        }
      }
    },

    // Called when adding a new Webhook block.
    // Automatically fills the URL, method, and secret for the new Webhook block
    // with the configuration of other webhook blocks in the tree.
    setWebhookConfigIfPossible(blockData) {
      const webhookBlockWithUrl = _.find(app.tree.get('blocks'), (b) => (b.type === 'WebhookBlock' && b.customData.url)
        || (b.type === 'WebhookContentBlock' && b.customData.url))

      if (!webhookBlockWithUrl) {
        return
      }

      blockData.customData.url = webhookBlockWithUrl.customData.url
      blockData.customData.title = webhookBlockWithUrl.customData.url
      blockData.customData.secret = webhookBlockWithUrl.customData.secret
      blockData.customData.method = webhookBlockWithUrl.customData.method
    },

    saveCopyOfBlockBeforeDelete(selectedBlockKey) {
      // Save the block we are just about to delete from the blocks array.
      app.ui.mostRecentlyDeletedBlock = app.tree.getBlock(selectedBlockKey)

      app.ui.mostRecentlyDeletedBlockConnections = []

      // Get array of all connections
      const allConnections = app.tree.get('connections')

      // Get array of block's own connections - both connections
      // going out of the block and connections coming into the block.
      //     Loop through all connections and check if selectedBlockKey
      // can be found in any of the connections' startBlockKey or endBlockKey.
      _.each(allConnections, (connection) => {
        if (connection.endBlockKey == selectedBlockKey
          || connection.startBlockKey == selectedBlockKey) {
          app.ui.mostRecentlyDeletedBlockConnections.push(connection)
        }
      })
    },

    // Bring back most recently deleted block and redraw connections
    undoDeleteBlock() {
      // Add the most recently deleted block back into the blocks model.
      app.tree.get('blocks')
        .push(app.ui.mostRecentlyDeletedBlock)

      // Loop through most recently deleted connections and
      // see if any of them are already in current connections.
      // If not, add the connection.
      _.each(app.ui.mostRecentlyDeletedBlockConnections, (connection) => {
        if (_.includes(app.tree.get('connections'), connection)) {
          console.log('Ignoring duplicate connection...')
        } else {
          app.tree.get('connections')
            .push(connection)
        }
      })

      // Redraw all connections related to that block:
      // this.resetJsPlumbBindings(true, app.ui.mostRecentlyDeletedBlock.jsKey)

      // Set mostRecentlyDeletedBlock to false so that
      // multiple undo presses do not add duplicate blocks.
      app.ui.mostRecentlyDeletedBlock = false
    },

    deleteBlock() {
      const selectedBlockKey = app.ui.selectedBlock
      const selectedBlockElement = $(`#${selectedBlockKey}`)
      const selectedBlock = app.tree.getBlock(selectedBlockKey)

      // Save copy of block and connections before deleting.
      this.saveCopyOfBlockBeforeDelete(selectedBlockKey)

      const {numConnections} = selectedBlock.uiData

      // Remove the connections from each of the nodes at the bottom of the block
      _.each(_.range(1, numConnections + 1), (index) => {

        // app.jsPlumb.detachAllConnections(selectedBlockKey + '_node_' + index);

      })

      // Remove any connections connected to the "target" / top of the block
      // Fortunately these call the jsPlumb binding for removing a connection
      // which in turn is set to remove the entry from the app.tree.get('connections') array. Yay!
      // app.jsPlumb.detachAllConnections(selectedBlockKey + '_target');

      // Remove the block element from the DOM via jQuery
      $(selectedBlockElement)
        .remove()

      // Remove the actual entry from the model's blocks array
      app.tree.deleteBlock(selectedBlockKey)

      // handle if the deleted block was a numeric question block - amend associated
      if (selectedBlock.type == 'NumericQuestionBlock') {
        app.tree.handleDeleteNumericQuestionBlockAssociations(selectedBlockKey)
      }

      // Flag that a change has occured:
      app.ui.change('Block deleted.')

      if (app.tree.get('details').startingBlockKey == '') {
        // Then, we just deleted the startingBlockId
        app.tree.setStartingBlock(app.tree.getShortestBlockKey())
        app.ui.change('New starting block set (to shortest).')
      }

      // Unselect the block (which also sets the sidebar back to tree details)
      this.deselectBlocks()
    },

    duplicateSelectedBlock() {
      const selectedBlock = app.tree.getBlock(app.ui.selectedBlock)
      const duplicateBlock = _.cloneDeep(selectedBlock)

      duplicateBlock.jsKey = app.tree.makeUniqueId('block_')

      duplicateBlock.uiData.xPosition += 80
      duplicateBlock.uiData.yPosition += 60

      // Add the new block into the data model
      app.tree.get('blocks')
        .push(duplicateBlock)

      // Select the new block
      this.selectBlock(duplicateBlock.jsKey)

      // Add jsPlumb triggers
      // this.resetJsPlumbBindings(false)

      // Flag for a new save
      app.ui.change('Duplicated block.')
    },

    // resetJsPlumbBindings(shouldRegenerateConnections=true, selectedBlockKey) {
    //   const handleDragStop = this.discoverTallestBlockForDesignerWorkspaceHeight.bind(null, {aboveTallest: true})
    //
    //   app.jsPlumb.resetBindings(
    //       app.tree.get('connections'),
    //       shouldRegenerateConnections,
    //       selectedBlockKey,
    //       handleDragStop)
    // },

    selectBlock(blockKey) {
      app.ui.selectedBlock = blockKey
    },

    saveTreeRepeater() {
      if (builder.$store.getters.isFeatureTreeSaveEnabled) {
        this.attemptSaveTree()
        _.delay(this.saveTreeRepeater, app.ui.saveTimer * 1000)
      } else {
        console.info('Feature `treeSave` is disabled')
      }
    },

    makeEditable() {
      this.$store.commit('updateIsEditable', {value: 1})
      // this.deselectBlocks()
      this.initializeAll(1)
    },

    makeUnEditable() {
      // By default, save before un-editing.
      this.saveTree()

      this.$store.commit('updateIsEditable', {value: 0})
      // this.deselectBlocks()
      this.initializeAll(1)
    },

    toggleEditable() {
      if (app.ui.isEditable == 0) {
        this.makeEditable()
      } else {
        this.makeUnEditable(1)
      }
    },

    handleSelectBlock(e) {
      e.stopPropagation()

      const block = $(e.currentTarget)
        .parent()
      const blockKey = $(block)
        .attr('id')

      this.selectBlock(blockKey)
    },

    renderOutputNameFor(i, block) {
      const name = _.get(block.uiData.outputNames, i, i + 1)

      return Lang.has(name)
        ? Lang.trans(name)
        : Lang.has(`trees.output-${_.kebabCase(name)}`)
          ? Lang.trans(`trees.output-${_.kebabCase(name)}`)
          : name
    },
  },
}
