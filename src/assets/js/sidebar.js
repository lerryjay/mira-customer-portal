document.addEventListener("DOMContentLoaded", () => {
    //Link click remove sidebar
    document.querySelectorAll(".nav-item").forEach(item => {
        item.addEventListener("click", () => {
            document.querySelector('#sidebar').classList.remove('active');
            document.querySelector('.overlay').classList.remove('active');
        })
    })
    //onclick Toggle button add sideBar
    document.querySelector("#sidebarCollapse").addEventListener("click", () => {
        document.querySelector('#sidebar').classList.toggle('active');
        document.querySelector('.overlay').classList.toggle('active');
    })
    //onclick arrow-left hide sideBar
    document.querySelector("#dismiss").addEventListener("click", () => {
        document.querySelector('#sidebar').classList.remove('active');
        document.querySelector('.overlay').classList.remove('active');
    })
    //onclick overlay hide sideBar
    document.querySelector(".overlay").addEventListener("click", () => {
        document.querySelector('#sidebar').classList.remove('active');
        document.querySelector('.overlay').classList.remove('active');
    })
})
