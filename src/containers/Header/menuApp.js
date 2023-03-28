export const adminMenu = [
    { //Quản lý người dùng
        name: 'menu.admin.header', menus: [
            {
                name: 'menu.admin.manage-doctor',
                link: '/admin/doctor-manage'
                // subMenus: [
                //     { name: 'menu.admin.admin-administrator.user-manage', link: '/admin/user-manage' },
                //     
                // ]
            },

            { name: 'menu.admin.manage-user', link: '/admin/user-manage' },

            { //Quản lý lịch khám bệnh của bác sĩ
                name: 'menu.doctor.manage-schedule', link: "/doctor/manage-schedule"

            },
        ]
    },
    {//quản lý phòng khám
        name: 'menu.admin.clinic',
        menus: [
            { name: 'menu.admin.manage-clinic', link: '/admin/manage-clinic' }
        ]
    },
    {//Quản lý chuyên ngành
        name: 'menu.admin.specialty',
        menus: [
            { name: 'menu.admin.manage-specialty', link: '/admin/manage-specialty' }
        ]
    },
    {//Quản lý cẩm nang
        name: 'menu.admin.handbook',
        menus: [
            { name: 'menu.admin.manage-handbook', link: '' }
        ]

    },

];

export const doctorMenu = [
    {
        name: 'menu.admin.header', menus: [
            { //Quản lý lịch khám bệnh của bác sĩ

                name: 'menu.doctor.manage-schedule', link: "/doctor/manage-schedule"

            },
            {
                name: 'menu.doctor.manage-patient', link: "/doctor/manage-patient"
            }
        ]
    }
];