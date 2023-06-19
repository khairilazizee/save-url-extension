document.addEventListener('DOMContentLoaded', function() {
    var saveButton = document.getElementById('saveButton');
    var videoList = document.getElementById('videoList');
  
    saveButton.addEventListener('click', function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var currentUrl = tabs[0].url;
        var listItem = document.createElement('li');
        listItem.textContent = currentUrl;
        videoList.appendChild(listItem);
        saveVideo(currentUrl);
      });
    });
  
    function saveVideo(videoUrl) {
      chrome.storage.sync.get('videos', function(data) {
        var videos = data.videos || [];
        videos.push(videoUrl);
        chrome.storage.sync.set({ 'videos': videos });
      });
    }
  
    chrome.storage.sync.get('videos', function(data) {
      var videos = data.videos || [];
      videos.forEach(function(video) {
        var listItem = document.createElement('li');
        listItem.textContent = video;
        videoList.appendChild(listItem);
      });
    });
  });
  