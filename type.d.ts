type Employee = {
    employee_id:    string   
    name:           string
    gender:         string
    date_of_birth:  DateTime 
    address:        string
    contact:        string   
    role:           string
    username:       string   
    password:       string
    floor_assigned: number
    hire_date?:      DateTime 
    last_edit?:      DateTime
}


type Room = {
    room_id:         string   
    tipe:            string
    floor:           number
    price:           number
    occupied_status: boolean
    condition?:       string
    flag:            boolean
    image?:           string
    repair_notes?:    string
    room_name:       string
}

type Report = {
    report_id:          string   
    report_title:       string
    room_repaired:      string
    eic:                string
    date?:               DateTime 
    repair_description: string
}