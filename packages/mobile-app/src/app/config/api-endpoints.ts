export class ApiEndpoints {
    //public static BASE_URL = 'http://192.168.99.100:3000/api/v1/';
    //public static BASE_URL = 'http://localhost:3000/api/v1/';
    public static BASE_URL = 'https://modos.heig-vd.ch/api/v1/';

    public static USERS = ApiEndpoints.BASE_URL + 'users';
    public static EVENTS = ApiEndpoints.BASE_URL + 'events';
    public static OBSERVATIONS = ApiEndpoints.BASE_URL + 'observations';
    public static OBSTACLES = ApiEndpoints.BASE_URL + 'observations/obstacles?frontend=true';
    public static AUTHENTICATION = ApiEndpoints.BASE_URL + 'authenticate';
}
