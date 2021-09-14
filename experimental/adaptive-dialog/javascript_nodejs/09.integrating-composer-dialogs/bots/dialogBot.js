// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { LanguageGeneratorExtensions, ResourceExtensions } = require('botbuilder-dialogs-adaptive');
const { ActivityHandler } = require('botbuilder');
const { DialogManager } = require('botbuilder-dialogs');

class DialogBot extends ActivityHandler {
    /**
     *
     * @param {ConversationState} conversationState
     * @param {UserState} userState
     * @param {Dialog} dialog
     */
    constructor(conversationState, userState, dialog, resourceExplorer) {
        super();
        if (!conversationState) throw new Error('[DialogBot]: Missing parameter. conversationState is required');
        if (!userState) throw new Error('[DialogBot]: Missing parameter. userState is required');
        if (!dialog) throw new Error('[DialogBot]: Missing parameter. dialog is required');

        this.dialogManager = new DialogManager(dialog);
        this.dialogManager = ResourceExtensions.useResourceExplorer(this.dialogManager, resourceExplorer);
        this.dialogManager = LanguageGeneratorExtensions.useLanguageGeneration(this.dialogManager, 'main-without-luis.en-us.lg');
        this.dialogManager.conversationState = conversationState;
        this.dialogManager.userState = userState;

        this.onTurn(async (context, next) => {
            console.log('Running dialog with activity.');

            await this.dialogManager.onTurn(context);

            await next();
        });
    }
}

module.exports.DialogBot = DialogBot;
