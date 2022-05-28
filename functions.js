function mousePressed() {
    let fs = fullscreen();
    fullscreen(!fs);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function arrSetup(){
    for(var i = 0; i < segments - 1; i++){
        segAvs.push(0);
        segPreAvs.push(0);
    }
}

function drawSegmentLines() {
    x = width / segments;
    for (var i = + 0; i < segAvs.length -1; i++) {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(x, 0, x, height);
        noStroke();
        x += width / segments;
    }
}

//Calculate All Segement Averages
function calAllSegAvs() {
    countPreAvs++;
    if (countPreAvs <= countPreAvsThreshold) {
        for (var i = 0; i < segPreAvs.length; i++) {
            segPreAvs[i] = int(segAvs[i]);
        }
        countPreAvs = 0;
    }
    for (var i = 0; i < segAvs.length; i++) {
        for (var a = i * segSpan; a < (i + 1) * segSpan; a++) {
            segAvs[i] += spectrum[a];
        }
        segAvs[i] /= segSpan;
        segAvs[i] = int(segAvs[i]);
    }
}

function spikeCheck(i) {
    if (segAvs[i] > segPreAvs[i] * spikeThreshold && segAvs[i] > minSpikeThreshold) {
        return true;
    } else {
        return false;
    }
}