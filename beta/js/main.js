// noinspection ThisExpressionReferencesGlobalObjectJS
(function(global) {

	'use strict';

	// region Functions

	function dumpBuffer(buffer, radix) {
		return Array.from(new Uint16Array(buffer)).map(function(b) {
			// noinspection JSUnresolvedFunction
			return b.toString(radix).padStart(4, '0')}).join(' ').toUpperCase();
	}

	function printState(state) {
		$STATE.innerHTML = dumpBuffer(state.B, 16).replace(' ', '&nbsp;');

		//noinspection JSCheckFunctionSignatures,JSUnresolvedFunction
		$AX.innerHTML = state.R.AX.toString(16).padStart(4, '0').toUpperCase();
		//noinspection JSCheckFunctionSignatures,JSUnresolvedFunction
		$BX.innerHTML = state.R.BX.toString(16).padStart(4, '0').toUpperCase();
		//noinspection JSCheckFunctionSignatures,JSUnresolvedFunction
		$CX.innerHTML = state.R.CX.toString(16).padStart(4, '0').toUpperCase();
		//noinspection JSCheckFunctionSignatures,JSUnresolvedFunction
		$DX.innerHTML = state.R.DX.toString(16).padStart(4, '0').toUpperCase();

		//noinspection JSCheckFunctionSignatures,JSUnresolvedFunction
		$AH.innerHTML = state.R.AH.toString(16).padStart(2, '0').toUpperCase();
		//noinspection JSCheckFunctionSignatures,JSUnresolvedFunction
		$AL.innerHTML = state.R.AL.toString(16).padStart(2, '0').toUpperCase();

		//noinspection JSCheckFunctionSignatures,JSUnresolvedFunction
		$BH.innerHTML = state.R.BH.toString(16).padStart(2, '0').toUpperCase();
		//noinspection JSCheckFunctionSignatures,JSUnresolvedFunction
		$BL.innerHTML = state.R.BL.toString(16).padStart(2, '0').toUpperCase();

		//noinspection JSCheckFunctionSignatures,JSUnresolvedFunction
		$CH.innerHTML = state.R.CH.toString(16).padStart(2, '0').toUpperCase();
		//noinspection JSCheckFunctionSignatures,JSUnresolvedFunction
		$CL.innerHTML = state.R.CL.toString(16).padStart(2, '0').toUpperCase();

		//noinspection JSCheckFunctionSignatures,JSUnresolvedFunction
		$DH.innerHTML = state.R.DH.toString(16).padStart(2, '0').toUpperCase();
		//noinspection JSCheckFunctionSignatures,JSUnresolvedFunction
		$DL.innerHTML = state.R.DL.toString(16).padStart(2, '0').toUpperCase();

		// noinspection JSUnresolvedFunction
		$CS.innerHTML = state.R.CS.toString(16).padStart(4, '0').toUpperCase();
		// noinspection JSUnresolvedFunction
		$DS.innerHTML = state.R.DS.toString(16).padStart(4, '0').toUpperCase();
		// noinspection JSUnresolvedFunction
		$ES.innerHTML = state.R.ES.toString(16).padStart(4, '0').toUpperCase();
		// noinspection JSUnresolvedFunction
		$SS.innerHTML = state.R.SS.toString(16).padStart(4, '0').toUpperCase();

		//noinspection JSCheckFunctionSignatures,JSUnresolvedFunction
		$SI.innerHTML = state.R.SI.toString(16).padStart(4, '0').toUpperCase();
		//noinspection JSCheckFunctionSignatures,JSUnresolvedFunction
		$DI.innerHTML = state.R.DI.toString(16).padStart(4, '0').toUpperCase();
		//noinspection JSCheckFunctionSignatures,JSUnresolvedFunction
		$BP.innerHTML = state.R.BP.toString(16).padStart(4, '0').toUpperCase();
		//noinspection JSCheckFunctionSignatures,JSUnresolvedFunction
		$SP.innerHTML = state.R.SP.toString(16).padStart(4, '0').toUpperCase();

		//noinspection JSCheckFunctionSignatures,JSUnresolvedFunction
		$IP.innerHTML = state.R.IP.toString(16).padStart(4, '0').toUpperCase();

		//noinspection JSCheckFunctionSignatures,JSUnresolvedFunction
		$F.innerHTML = state.R.F.toString(16).padStart(4, '0').toUpperCase();

		//noinspection JSCheckFunctionSignatures,JSUnresolvedFunction
		$FLAGS.innerHTML = state.R.F.toString(2).padStart(16, '0').toUpperCase().split('').join('&nbsp;');

		$CF.innerHTML = state.F.CF;
		$PF.innerHTML = state.F.PF;
		$AF.innerHTML = state.F.AF;
		$ZF.innerHTML = state.F.ZF;
		$SF.innerHTML = state.F.SF;
		$TF.innerHTML = state.F.TF;
		$IF.innerHTML = state.F.IF;
		$DF.innerHTML = state.F.DF;
		$OF.innerHTML = state.F.OF;
	}

	global.update = function(state) {
		printState(state);
	};

	// endregion

	// region Variables

	var $STATE	= $('.STATE');

	var $AX		= $('.AX');
	var $BX		= $('.BX');
	var $CX		= $('.CX');
	var $DX		= $('.DX');

	var $AH		= $('.AH');
	var $AL		= $('.AL');
	var $BH		= $('.BH');
	var $BL		= $('.BL');
	var $CH		= $('.CH');
	var $CL		= $('.CL');
	var $DH		= $('.DH');
	var $DL		= $('.DL');

	var $CS		= $('.CS');
	var $DS		= $('.DS');
	var $ES		= $('.ES');
	var $SS		= $('.SS');

	var $SI		= $('.SI');
	var $DI		= $('.DI');
	var $BP		= $('.BP');
	var $SP		= $('.SP');

	var $IP		= $('.IP');

	var $F		= $('.F');

	var $FLAGS	= $('.FLAGS');

	var $CF		= $('.CF');
	var $PF		= $('.PF');
	var $AF		= $('.AF');
	var $ZF		= $('.ZF');
	var $SF		= $('.SF');
	var $TF		= $('.TF');
	var $IF		= $('.IF');
	var $DF		= $('.DF');
	var $OF		= $('.OF');

	var cpu		= null;

	// endregion

	if (SYSTEM_FEATURE_WORKERS) {
		cpu = new Worker('js/worker.js');

		cpu.onmessage = function(e) {
			global.console.log('cpu => browser');
			// global.console.log(e);
			// global.console.log(e.data);

			switch (typeof e.data) {
				case 'object':
					if (typeof e.data.state !== 'undefined') {
						global.update(e.data.state);
						global.console.log(e.data);
					} else {
						global.console.log(e.data);
					}
					break;
				default:
					global.console.log(e.data);
					break;
			}
		};
		// noinspection JSUndefinedPropertyAssignment
		cpu.onmessageerror = function() {
			global.console.log('cpu.onmessageerror()');
		};
		cpu.onerror = function() {
			global.console.log('cpu.onerror()');
		};
		// noinspection JSDeprecatedSymbols
		cpu.postMessage('state');
	} else {
		importScripts('js/worker.js');
	}

}(this));