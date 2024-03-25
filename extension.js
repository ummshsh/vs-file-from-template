const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.createTimestampedFile', function () {
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
            const currentFilePath = activeEditor.document.uri.fsPath;
            const folderPath = path.dirname(currentFilePath);
    
            let fileName = new Date().toISOString().replace(/:/g, '-').split('.')[0].replace('T', '-') + '.md';
            let filePath = path.join(folderPath, fileName);
    
            fs.writeFile(filePath, '---\n---', err => {
                if (err) {
                    vscode.window.showErrorMessage('Failed to create file!');
                    return console.error(err);
                }
                vscode.window.showInformationMessage('File created successfully!');
                vscode.workspace.openTextDocument(filePath).then(doc => {
                    vscode.window.showTextDocument(doc);
                });
            });
        } else {
            vscode.window.showErrorMessage('No active editor found!');
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
