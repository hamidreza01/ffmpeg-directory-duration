const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const videoDirectory = 'FILE PATH';
const ffprobePath = 'ffprobe PATH';

function getTotalDuration(directory) {
  const files = fs.readdirSync(directory);

  let totalDuration = 0;

  files.forEach((file) => {
    const filePath = path.join(directory, file);

    try {
      const stdout = execSync(`"${ffprobePath}" "${filePath}" -show_entries format=duration -of compact=p=0:nk=1 -v 0`);
      const fileDuration = parseFloat(stdout.toString());
      
      totalDuration += fileDuration;
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  });

  console.log(`Total duration: ${totalDuration.toFixed(2)} seconds`);
}

getTotalDuration(videoDirectory);
