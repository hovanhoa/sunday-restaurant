let sidebar = document.querySelector('.sidebar');
let closeBtn = document.querySelector('#btn');
// let searchBtn = document.querySelector(".bx-search");

closeBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  menuBtnChange(); //calling the function(optional)
});

window.onclick = (event) => {
  if (!event.target.matches('#btn')) {
    if (sidebar.classList.contains('open')) {
      sidebar.classList.remove('open');
    }    
  }
}
// searchBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
//   sidebar.classList.toggle("open");
//   menuBtnChange(); //calling the function(optional)
// });

// following are the code to change sidebar button(optional)
function menuBtnChange() {
  const Container = document.getElementsByClassName('content-container');
  if (sidebar.classList.contains('open')) {
    // closeBtn.classList.replace('bx-menu', 'bx-menu-alt-right'); //replacing the iocns class
    Container.classList.add('active');
  } else {
    // closeBtn.classList.replace('bx-menu-alt-right', 'bx-menu'); //replacing the iocns class
    Container.classList.remove('active');
  }
}
