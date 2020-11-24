URL = window.URL || window.webkitURL;

var gumStream;
var rec;
var input;

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext
var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");
var pauseButton = document.getElementById("pauseButton");
var translateButton = document.getElementById("translate");
var fileRecord;


recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
pauseButton.addEventListener("click", pauseRecording);
translateButton.addEventListener("click", translateClick);


function startRecording() {
	var constraints = { audio: true, video: false }
	recordButton.disabled = true;
	stopButton.disabled = false;
	pauseButton.disabled = false
	navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
		audioContext = new AudioContext();
		document.getElementById("formats").innerHTML = "Format: 1 channel pcm @ " + audioContext.sampleRate / 1000 + "kHz"
		gumStream = stream;
		input = audioContext.createMediaStreamSource(stream);
		rec = new Recorder(input, { numChannels: 1 })
		rec.record()


	}).catch(function (err) {
		recordButton.disabled = false;
		stopButton.disabled = true;
		pauseButton.disabled = true
	});
}

function pauseRecording() {
	if (rec.recording) {
		rec.stop();
		pauseButton.innerHTML = "Resume";
	} else {
		rec.record()
		pauseButton.innerHTML = "Pause";

	}
}

function showImages(listLocation) {
	$("#listImages").empty();
	if (listLocation.length > 0) {
		var listImage = "";
		listLocation.map((locationImage) => {
			listImage += '<div class="media"><a class= "myClass" href = "' + locationImage + '" > <img src="' + locationImage + '" alt="" title="This right here is a caption." /></a></div > '
		});
		$('#listImages').append(listImage);
	}
}

function stopRecording() {
	stopButton.disabled = true;
	recordButton.disabled = false;
	pauseButton.disabled = true;
	pauseButton.innerHTML = "Pause";
	rec.stop();
	gumStream.getAudioTracks()[0].stop();
	rec.exportWAV(createRecordControl);
}

function translateClick() {
	var result = $("#resultTranslate");
	result.val("");
	$.ajax({
		url: 'https://demo-translate-zovivo.herokuapp.com/translation/read-file',
		type: 'post',
		dataType: 'json',
		cache: false,
		contentType: false,
		processData: false,
		data: fileRecord,
		success: function (data) {
			if (data) {
				result.val(data.data.result);
				showImages(data.data.images);
			}
		},
	});
}

function createRecordControl(blob) {

	var url = URL.createObjectURL(blob);
	var au = document.createElement('audio');
	var li = document.createElement('li');
	var link = document.createElement('a');
	var filename = 'record';
	au.controls = true;
	au.src = url;
	link.href = url;
	link.download = filename + ".wav";
	li.appendChild(au);
	var fd = new FormData();
	fd.append("fileRecord", blob, filename);
	fileRecord = fd;
	li.appendChild(document.createTextNode(" "))
	recordingsList.appendChild(li);
}