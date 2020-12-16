    const URL = "https://teachablemachine.withgoogle.com/models/_tT8PRctS/";

    let model, webcam, labelContainer, maxPredictions;

    function readURL(input) {
        if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
            $('#blah')
              .attr('src', e.target.result)
              .width(150)
              .height(200);
          };
          reader.readAsDataURL(input.files[0]);
        }
      }
    async function start() {
        const modelURL = URL + 'model.json';
        const metadataURL = URL + 'metadata.json';

        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        labelContainer = document.getElementById('label1-container');
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement('div'));
        }

        await predict();
        
    }
    async function predict() {
        // predict can take in an image, video or canvas html element
        var img = document.querySelector('#blah')
        const prediction = await model.predict(img);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
				prediction[i].className + ': ' + prediction[i].probability.toFixed(2) * 100 + '%';
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
    }
