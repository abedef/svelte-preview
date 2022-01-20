// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "svelte-preview" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('svelte-preview.importInMainJs', function () {
		// The code you place here will be executed every time your command is executed

		if (vscode.window.activeTextEditor) {
			let thisFile = vscode.window.activeTextEditor.document;
			var thisWorkspace = vscode.workspace.getWorkspaceFolder(thisFile.uri);
			if (thisWorkspace) {
				let mainJsUri = vscode.Uri.joinPath(thisWorkspace.uri, "src", "main.js");
				vscode.workspace.fs.stat(mainJsUri).then(() => {
					let massagedPath = thisFile.uri.path.replace(vscode.Uri.joinPath(thisWorkspace.uri, "src").path, ".");
					console.log("Attempting to replace import path in " + mainJsUri.path + " with " + massagedPath);
					vscode.window.showInformationMessage("Replacing import path...");
					let textRange = new vscode.Range(new vscode.Position(0, 0), new vscode.Position(1, 0));

					let edit = new vscode.WorkspaceEdit();
					edit.replace(mainJsUri, textRange, "import App from '" + massagedPath + "';\n");
					vscode.workspace.applyEdit(edit).then(success => {
						console.log(success);
						// TODO: This is bad – make it only save the one file it modified (main.js)
						// Seems to require that the file is open for this to happen – disabling
						// vscode.workspace.saveAll();
						// TODO: Should at least show main.js so the user can save the file manually (to trigger the Svelte compiler)
					}, err => {
						console.log(err);
					});
				}, err => {
					console.log(err);
					vscode.window.showErrorMessage("Not found: " + mainJsUri.path);
				});
			}
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
