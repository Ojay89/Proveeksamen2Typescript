import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

interface ISki {
    id: Number;
    skiLength: Number;
    skiType: String;
    price: Number;
}

let baseUrl: string = "http://omarproveeksamen2.azurewebsites.net/api/ski"

new Vue({
    el: "#app",
    data: {
        skis: [],
        errorMessage: "",
        formData: {
            id: 0,
            skiLength: 0,
            skiType: "",
            price: 0
        },
        addMessage: "",
             
    },

    methods: {
        getAllSkis(){
            console.log("getAllSkis")
            axios.get<ISki[]>(baseUrl)
            .then((response: AxiosResponse<ISki[]>) => {
                console.log(response.data)
                this.skis = response.data
            })
        },

        addSki() {
            let addIdElement: HTMLInputElement = <HTMLInputElement> document.getElementById("addId")
            let addElementSkiLength: HTMLInputElement = <HTMLInputElement> document.getElementById("addSkiLength")
            let addIdElementSkiType: HTMLInputElement = <HTMLInputElement> document.getElementById("addSkiType")
            let addIdElementPrice: HTMLInputElement = <HTMLInputElement> document.getElementById("addPrice")

            let myID: number = Number(addIdElement.value);
            let mySkiLength: number = Number(addElementSkiLength.value)
            let mySkiType: string = addIdElementSkiType.value;
            let myPrice: number = Number(addIdElementPrice.value);
            
            axios.post<ISki>(baseUrl, {id: myID, skiLength: mySkiLength, skiType: mySkiType, price: myPrice})
            .then((Response:AxiosResponse) => {
                let message: string = "response " + Response.status + " " + Response.statusText
                this.addMessage = message
                this.getAllSkis()
            })

            .catch((error: AxiosError) => {
               alert(error.message)
            })
        },

    }
})