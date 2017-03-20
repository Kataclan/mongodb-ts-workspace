//#region [ Import React ]
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//#endregion

import * as $ from 'jquery';

//#region [ Import Project Class ]
import NCILayer from './NCILayer';
//#endregion

export class NCIManager {

	layer: React.Component<any, {}>;

	constructor() {

		$('<div id="app_nci"></nci>').insertBefore('#app');

		//this.layer = 
		ReactDOM.render(
			<NCILayer ref={(c) => this.layer = c} />,
			document.getElementById('app_nci')
		) as React.Component<any, {}>;
	}

	showNCI(): void {
		console.log("[NCIManager] show NCI");
		this.layer.setState({ isOpen: true, startInfo: true });
	}

	hideNCI(): void {
		console.log("[NCIManager] hide NCI");
		this.layer.setState({ isOpen: false, startInfo: false });
	}

	clearActions() {
		this.layer.setState({ actions: [] });
	}

	addAction(name: string, image: string) {
		var curActions = (this.layer.state as any).actions;
		curActions.push({ name: name, image: image });
		console.log('setting actions of NCI ' + curActions);
		this.layer.setState({ actions: curActions });
	}

	setFirstImage(image: string) {
		this.layer.setState({ firstImage: image });
	}
}
