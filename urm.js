
var startingRegisters;
var instructions;
var registers;
var currentLine;
var nextLine;

function load() {
	startingRegisters = $('#registers input').map(function (i, x) {return parseInt(x.value);});
	instructions = $('#program').val().split('\n').map(function(x) {return x.split('.')[1].trim()});

	registers = startingRegisters.slice(0);
	currentLine = 1;
	nextLine = 2;

	$('#pointer').css('visibility', 'visible');
	showLineNumber();
}

function step() {
	showLineNumber();

	if (currentLine >= instructions.length) {
		return;
	}

	nextLine = currentLine + 1;
	try {
		instruction = instructions[currentLine - 1];
		// console.log(currentLine + '. ' + instruction);

		type = instruction.split('(')[0];
		args = instruction.split('(')[1].split(')')[0].split(',');

		switch (type) {
			case 'Z':
				registers[args[0] - 1] = 0;
				break;
			case 'S':
				registers[args[0] - 1]++;
				break;
			case 'T':
				registers[args[1] - 1] = registers[args[0] - 1];
				break;
			case 'J':
				if (registers[args[0] - 1] == registers[args[1] - 1]) {
					nextLine = parseInt(args[2]);
					console.log('Jumping to line ' + nextLine);
				}
				break;

		}
	} catch (err) {
	}

	displayRegisters();
	currentLine = nextLine;
}

function run() {
	while (nextLine < instructions.length) {
		step();
	}
	step();
}

function displayRegisters() {
	for (var i = 0; i < registers.length; i++) {
		$($('#registers input').get(i)).val(registers[i]);
	}
}

function showLineNumber () {
	$('#pointer').css('margin-top', (currentLine - 1) + 'em');
}
