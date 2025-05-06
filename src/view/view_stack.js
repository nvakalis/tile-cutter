import {sliceImage} from "../slice.js";
import { html } from '../utils/domHelpers';
import GUI from 'lil-gui';
import { renderCheckers } from '../render.js'

export function start_view_stack() {

	var st = app.main_settings;
	var n = st.rows * st.columns;

	html('content',`
	<div class="container">
    <div class="column-1">
        <div id="stack_content" class="content-box">
			<canvas id="stackCanvas" width="${st.cellWidth}" height="${st.cellHeight}" style="background:pink"></canvas>
        </div>
    </div>
    <div id ="rcol" class="column-2">
        <div id="stack_tools" class="tool-box">
        </div>
    </div>
</div>
    `);

	window.stack_settings = getStactSettings(st.rows, st.columns)
	window.stack_gui = get_stack_gui(st.rows , st.columns);

	drawStack();
}

export function terminate_view_stack() { stack_gui.destroy(); }

export function redrawCanvas_view_stack() {
	console.log("redrawCanvas_view_stack");
	var st = app.main_settings;

	html('stack_content', `<canvas id="stackCanvas" width="${st.cellWidth}" height="${st.cellHeight}" style="background:pink"></canvas>`);
	stack_gui.destroy();
	window.stack_settings = getStactSettings(st.rows, st.columns);
	stack_gui = get_stack_gui(st.rows, st.columns);


	drawStack();
}

//---------------------------------------------------------
function getStactSettings(rowCount, colCount) {

	var settings = {}

	for (var r = 0; r < rowCount; r++)
		for (var c = 0; c < colCount; c++)
			settings[`opacity_${r}_${c}`] = 1;

	settings["all_layers"] = 1;

	return settings;
}

function get_stack_gui(rowCount, colCount) {
	var gui = new GUI({ container: document.getElementById('stack_tools') });
	gui.title('Stack View Settings');

	for (var r = 0; r < rowCount; r++) {
		const rowFolder = gui.addFolder(`Row ${r + 1}`);
		for (var c = 0; c < colCount; c++)
			rowFolder.add(stack_settings, `opacity_${r}_${c}`, 0, 1).step(0.1).name(`Column ${c + 1}`).onChange(drawStack).listen();
	}

	gui.add(stack_settings, "all_layers", 0, 1).step(0.1).name("All Layers").onChange(driveStack);

	return gui;
}

function drawStack() {
	var st = app.main_settings;
	var n = st.rows * st.columns;

	var opacities = [];

	for (var r = 0; r < st.rows; r++)
		for (var c = 0; c < st.columns; c++)
			opacities.push(stack_settings[`opacity_${r}_${c}`]);

	var slices = sliceImage(app.spaceMode);
	drawSlicesWithOpacity(slices, opacities);

}

function driveStack() {
	console.log("driveStack", stack_settings.all_layers);
	var v = stack_settings.all_layers;

	for (const key of Object.keys(stack_settings)) {
		if (key.startsWith('opacity_')) {
			stack_settings[key] = v;
		}
	}
	drawStack();
}


function drawSlicesWithOpacity(slices, opacities) {
	const canvas = document.getElementById('stackCanvas');
	const ctx = canvas.getContext('2d');

	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	renderCheckers(ctx);

	if (slices.length !== opacities.length) {
		console.error('Slices and opacities arrays must have the same length');
		return;
	}

	for (let i = 0; i < slices.length; i++) {
		ctx.save();

		ctx.globalAlpha = opacities[i];

		ctx.drawImage(slices[i].image, 0, 0);

		ctx.restore();
	}
}