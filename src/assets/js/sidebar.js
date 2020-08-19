document.addEventListener("DOMContentLoaded", () => {
    //Link click remove sidebar
    document.querySelectorAll(".nav-item").forEach(item => {
        item.addEventListener("click", () => {
            document.querySelector('#sidebar').classList.remove('active');
            document.querySelector('.overlay').classList.remove('active');
        })
    })
    // onclick Toggle button add sideBar
    // document.querySelector("#sidebarCollapse").addEventListener("click", () => {
    //     document.querySelector('#sidebar').classList.toggle('active');
    //     document.querySelector('.overlay').classList.toggle('active');
    // })
    // onclick arrow-left hide sideBar
    // document.querySelector("#dismiss").addEventListener("click", () => {
    //     document.querySelector('#sidebar').classList.remove('active');
    //     document.querySelector('.overlay').classList.remove('active');
    // })
    // onclick overlay hide sideBar
    document.querySelector(".overlay").addEventListener("click", () => {
        document.querySelector('#sidebar').classList.remove('active');
        document.querySelector('.overlay').classList.remove('active');
    })
});


const side = document.querySelector('.change');
const add = document.querySelector('#sidebarCollapse');
const overlay = document.querySelector('.overlay');

add.addEventListener("click", (e) => {
    side.id = "sidebar";
    side.classList.toggle("active");
    side.classList.toggle("d-none");
    overlay.classList.toggle("active");

});