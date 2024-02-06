const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    // sounds, to get both rain and beach sounds
    const sounds = document.querySelectorAll('.sound-picker button');

    // time display below the play button
    const timeDisplay = document.querySelector('.time-display');

    //time durations of various seconds/buttons
    const timeSelect = document.querySelectorAll('.time-select button');

    //get outline length to animate it
    const outlineLength = outline.getTotalLength();

    //duration of time of each button (5, 15, 30 minutes) as time goes
    let fakeDuration = 1800;

        outline.style.strokeDasharray = outlineLength;
        outline.style.strokeDashoffset = outlineLength; 


    //pick the sound you want
    //loop over sounds 
    sounds.forEach(sound => {
        sound.addEventListener('click', function(){
            //from line 69-70
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            //to run after clicking
            checkPlaying(song); 
        })
    });

    //play sound
        play.addEventListener('click', () => {
            checkPlaying(song);
        });


        //set different durations of time (5 min, 15 min, 30 min)
        //loop
        //for each button, want to go over
        timeSelect.forEach(option => {
            //when one is clicked normal function will run
            //can update in html with 'data-time'
            option.addEventListener('click', function() {
                fakeDuration = this.getAttribute('data-time');
                //update time display below play/pause button
                //minutes first then seconds
                timeDisplay.textContent = 
                `${Math.floor(fakeDuration / 60)}: 
                ${Math.floor(fakeDuration % 60)}`;
            });
        });

        //create function to pause and play sounds
        const checkPlaying = song => {
            if (song.paused) {
                //when we click on it, it will play
                song.play();
                //animate background video
                video.play();
                //change image
                play.src = './svg/pause.svg';
            }
            else {
                //when click, will pause
                song.pause();
                //pause background video
                video.pause();
                play.src = './svg/play.svg'
            }
        };


        //animate circle - time left
        //get current time of song
        //function runs everytime song runs
        //when sound plays
        song.ontimeupdate = () => {
            let currentTime = song.currentTime;
            //how much of timer is left
            let elapsed = fakeDuration - currentTime;
            //to animate the text
            //use Math.floor to get exact number, no decimals
            //reset back to 0 when gets to 60 seconds
            let seconds = Math.floor(elapsed % 60);
             //reset back to 0 when gets to 60 minutes
            let minutes = Math.floor(elapsed / 60);


            //animate progress circle
            let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
            outline.style.strokeDashoffset = progress;

            //animate text of time display
            timeDisplay.textContent = `${minutes}:${seconds}`;


            //to prevent bug of time going into minus time
            //if current time written is more than duration set, can pause song and reset song
            if (currentTime >= fakeDuration) {
                song.pause();
                song.currentTime = 0;
                //resets back to play
                play.src = './svg/play.svg';
                //also pause the video
                video.pause();
            }
        };
};

app();