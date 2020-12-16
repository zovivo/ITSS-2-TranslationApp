    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    const URL = "https://teachablemachine.withgoogle.com/models/_tT8PRctS/";

    let model, webcam, labelContainer, maxPredictions;

    // Load the image model and setup the webcam
    
    function readURL(input) {
        if (input.files && input.files[0]) {
          $('#blah').removeClass('none')
          $('#start-button').removeClass('none')
          $('.header-content').removeClass('header-content')
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
    async function go() {
      
        const modelURL = URL + 'model.json';
        const metadataURL = URL + 'metadata.json';

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        // const flip = true; // whether to flip the webcam
        // webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
        // await webcam.setup(); // request access to the webcam
        // webcam.play();
        // window.requestAnimationFrame(loop);

        labelContainer = document.getElementById('label1-container');
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement('div'));
        }

        await predict1();
        // append elements to the DOM
        
        
    }
    async function predict1() {
        // predict can take in an image, video or canvas html element
        var img = document.querySelector('#blah')
        const prediction = await model.predict(img);
        $('.sub').removeClass('none')
        $('.text-center').removeClass('none')
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
				prediction[i].className + ': ' + prediction[i].probability.toFixed(2) * 100 + '%';
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
    }
