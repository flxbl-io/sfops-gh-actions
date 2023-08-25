
function showDetails(id) {
  // Hide all content divs
  const contentDivs = document.getElementsByClassName('release-content');
  for (let i = 0; i < contentDivs.length; i++) {
    contentDivs[i].style.setProperty('display', 'none', 'important');
  }

  // Show the selected content div
  document.getElementById(id).style.setProperty('display', 'block', 'important');
}


function filterReleases() {
  const input = document.getElementById('searchInput');
  const filter = input.value.toUpperCase();
  const releaseButtons = document.getElementsByClassName('collapsible');

  for (let i = 0; i < releaseButtons.length; i++) {
      let button = releaseButtons[i];
      let txtValue = button.textContent || button.innerText;
      
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          button.style.display = "";
          // Make sure parent is visible too
          button.parentElement.parentElement.style.display = "";
      } else {
          button.style.display = "none";
      }
  }
}


  function toggleCollapsible(event) {
    event.target.classList.toggle("active");
    const content = event.target.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
}

function closeModal(orgName) {
  document.getElementById(`changes-${orgName}`).style.display = "none";
  document.body.style.overflow = 'auto';
}


function showChanges(orgName) {
    const modal = document.getElementById(`changes-${orgName}`);
    modal.style.display = "block";
    modal.focus();
    document.body.style.overflow = 'hidden';
}


async function copyToClipboard(text) {
  try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard: ' + text);
  } catch (err) {
      console.error('Failed to copy text: ', err);
  }
}
