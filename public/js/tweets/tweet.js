window.addEventListener('DOMContentLoaded', () => {
  bindTweet();
});

function bindTweet() {
  const elements = document.querySelectorAll('.delete-tweet');
  const tweetContainer = document.querySelector('#tweet-list-container');
  elements.forEach(e => {
    e.addEventListener('click', ($event) => {
      tweetContainer.classList.add("loading");
      const tweetId = $event.target.getAttribute('tweetid');
      axios.delete('/tweets/' + tweetId)
        .then(function(response) {
          tweetContainer.classList.remove("loading");
          tweetContainer.innerHTML = response.data;
          bindTweet();
        })
        .catch(function(err) {console.log(err)});
    })
  })
}