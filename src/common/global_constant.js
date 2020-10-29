// export const HTTPURL_TRN =  "http://192.168.1.4:8080/training_portal/api/"; 
// export const HTTPURL =  "http://192.168.1.4:8080/ticketapp/api/"; 
// export const FILEURL = "http://192.168.1.4:8080/ticketapp/"; 
// export const HTTPURL =  'http://localhost/ticketapp/api/';
// export const FILEURL = 'http://localhost/ticketapp/';

export const HTTPURL =  "https://www.miratechnologies.com.ng/customer-portal/api/"; 
export const FILEURL = "https://www.miratechnologies.com.ng/customer-portal/";
export const APIKEY = "97899c-7d0420-1273f0-901d29-84e2f8";


export const clientMenu = [
  {
    name: 'Dashboard',
    route: '/dashboard',
    icon: 'fa fa-tachometer-alt ',
    isActive: false
  },
  {
    name: 'Support',
    isDivider: true
  },
  {
    name: 'Ticket',
    route: 'ticket',
    icon: 'fa fa-ticket-alt',
    isActive: false,
    sub: [
      {
        name: 'Create Ticket',
        route: '/createticket',
        icon: '',
        isActive: false,
      },
      {
        name: 'List Tickets',
        route: '/tickets',
        icon: '',
        isActive: false,
      }
    ]
  },
  {
    name: 'Transactions',
    route: '/transactions',
    icon: 'fa fa-chart-pie',
    isActive: false
  },
  {
    name: 'Product',
    route: 'product',
    icon: 'fab fa-buffer',
    isActive: false,
    sub: [
      {
        name: 'View Products',
        route: '/products',
        icon: '',
        isActive: false
      },
      {
        name: 'My Product',
        route: '/clientproducts',
        icon: '',
        isActive: false
      }
    ]
  },
  {
    name: 'API Metrics',
    route: '/apilogs',
    icon: 'fa fa-chart-line',
    isActive: false
  },
  {
    name: 'Services',
    route: '/services',
    icon: 'fa fa-cog',
    isActive: false
  },
  {
    name: 'Account',
    isDivider: true
  },
  {
    name: 'Profile',
    route: '/profile',
    icon: 'fas fa-user fa-fw ',
    isActive: false
  },
  {
    name: 'Change Password',
    route: '/changePassword',
    icon: 'fas fa-key',
    isActive: false
  },
];

export const adminMenu = [
  {
    name: 'Dashboard',
    route: '/dashboard',
    icon: 'fa fa-tachometer-alt',
    isActive: false
  },
  {
    name: 'Support',
    isDivider: true
  },
  {
    name: 'Tickets',
    icon: 'fa fa-ticket-alt',
    isActive: false,
    sub: [
      {
        name: 'Create Ticket',
        route: '/createticket',
        icon: '',
        isActive: false,
      },
      {
        name: 'All Tickets',
        route: '/tickets',
        icon: '',
        isActive: false,
      }
    ]
  },
  {
    name: 'API Metrics',
    route: '/apilogs',
    icon: 'fa fa-chart-line',
    isActive: false
  },
  {
    name: 'Clients',
    icon: 'fa fa-user-friends',
    isActive: false,
    sub: [
      {
        name: 'Add Clients',
        route: '/addclient',
        icon: '',
        isActive: false,
      },
      {
        name: 'All Clients',
        route: '/clients',
        icon: '',
        isActive: false,
      }
    ]
  },
  {
    name: 'Transactions',
    route: '/transactions',
    icon: 'fa fa-chart-pie',
    isActive: false
  },
  {
    name: 'Products',
    icon: 'fab fa-buffer',
    isActive: false,
    sub: [
      {
        name: 'Add Product',
        route: '/createproduct',
        icon: '',
        isActive: false,
      },
      {
        name: 'All Products',
        route: '/products',
        icon: '',
        isActive: false,
      }
    ]
  },
  {
    name: 'Training',
    icon: 'fa fa-book',
    isActive: false,
    sub: [
      {
        name: 'Courses',
        route: '/coursepage',
        icon: '',
        isActive: false,
      },
      {
        name: 'Students',
        route: '/studentpage',
        icon: '',
        isActive: false,
      }
    ]
  },
  {
    name: 'Services',
    route: '/services',
    icon: 'fa fa-cog',
    isActive: false
  },
  {
    name: 'Web Analytics',
    route: '/webanalytics',
    icon: 'fa fa-chart-bar',
    isActive: false
  },
  {
    name: 'Account',
    isDivider: true
  },
  {
    name: 'Users',
    icon: 'fa fa-user-friends',
    isActive: false,
    sub: [
      {
        name: 'Users',
        route: '/users',
        icon: '',
        isActive: false,
      },
      {
        name: 'Administrators',
        route: '/admin',
        icon: '',
        isActive: false,
      }
    ]
  },
  {
    name: 'Profile',
    route: '/profile',
    icon: 'fas fa-user',
    isActive: false
  },
  {
    name: 'Change Password',
    route: '/changePassword',
    icon: 'fas fa-key',
    isActive: false
  },
];

export const ADMINPERMISSIONS =  [
  {
      name: "ADDADMIN"
  },
  {
      name: "LISTADMIN"
  },
  {
      name: "UPDATEADMIN"
  },
  {
      name: "VIEWADMIN"
  },
  {
      name: "CREATETICKET"
  },
  {
      name: "LISTTICKET"
  },
  {
      name: "MODIFYTICKET"
  },
  {
      name: "VIEWTICKET"
  },
  {
      name: "REPLYTICKET"
  },
  {
      name: "CREATECLIENT"
  },
  {
      name: "LISTCLIENT"
  },
  {
      name: "SEARCHCLIENT"
  },
  {
      name: "VIEWCLIENT"
  },
  {
      name: "UPDATECLIENT"
  },
  {
      name: "ADDDEPLOYMENT"
  },
  {
      name: "VIEWDEPLOYMENT"
  },
  {
      name: "VIEWDEPLOYMENTCOST"
  },
  {
      name: "VIEWDEPLOYMENTTIME"
  },
  {
      name: "UPDATEDEPLOYMENT"
  },
  {
      name: "UPDATEDEPLOYMENTFILE"
  },
  {
      name: "VIEWDEPLOYMENTFILE"
  },
  {
      name: "ADDPRODUCT"
  },
  {
      name: "LISTPRODUCT"
  },
  {
      name: "SEARCHPRODUCT"
  },
  {
      name: "DELETEPRODUCT"
  },
  {
      name: "UPDATEPRODUCT"
  },
  {
      name: "VIEWPRODUCT"
  },
  {
      name: "CREATEUSER"
  },
  {
      name: "LISTUSER"
  },
  {
      name: "VIEWUSER"
  },
  {
      name: "LISTAPILOGS"
  },
  {
      name: "LISTTRANSACTIONS"
  },
  {
      name: "LISTSERVICES"
  },
  {
      name: "LISTWEBANALYTICS"
  },
  {
      name: "ADDCOURSE"
  },
  {
      name: "VIEWCORSE"
  },
  {
      name: "UPDATECOURSE"
  },
  {
      name: "LISTCOURSE"
  },
  {
      name: "ADDSTUDENT"
  },
  {
      name: "VIEWSTUDENT"
  },
  {
      name: "LISTSTUDENT"
  },
  {
      name: "ADDSTUDENTCOURSE"
  },
  {
      name: "VIEWSTUDENTCOURSE"
  },
  {
      name: "SUSPENDSTUDENT"
  },
  {
      name: "ADDSERVICE"
  },
];