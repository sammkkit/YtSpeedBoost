document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.speed-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const speed = button.getAttribute('data-speed');
            changePlaybackSpeed(speed);
        });
    });
});

function changePlaybackSpeed(speed) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0].id;
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: setPlaybackSpeed,
            args: [speed]
        });
    });
}

function setPlaybackSpeed(speed) {
    const video = document.querySelector('video');
    if (video) {
        video.playbackRate = parseFloat(speed);
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    document.body.appendChild(toast);
    
    // Remove the toast after 2 seconds
    setTimeout(() => {
      toast.remove();
    }, 2000);
  }
