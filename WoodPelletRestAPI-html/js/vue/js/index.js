// use https (http secure).
// http (non secure) will make the app complain about mixed content when running the app from Azure
const baseUrl = "https://restwoodpellets20241021104246.azurewebsites.net/Api/woodpellets"

Vue.createApp({
    data() {
        return {
            woodpellets: [],
            woodpelletId: null,
            singlewoodpellet: null,
            addData: { Id: "", Brand: "", Price: 0, Quality: "" },
            addMessage: "",
            idToDelete: null,
            deleteMessage: "",
            idToUpdate: null,
            updateData: {Id: "", Brand: "", Price: 0, Quality: ""},
            updateMessage: ""
        }
    },
    async created() { // life cycle method. Called when browser reloads page
        try {
            const response = await axios.get(baseUrl)
            this.woodpellets = await response.data
            console.log(this.woodpellets)
            console.log(response.data)  
        } catch (ex) {
            alert(ex.message) // https://www.w3schools.com/js/js_popup.asp
        }
    },
    methods: {
        async GetAllWoodPellets() {
            try {
                const response = await axios.get(baseUrl)
                this.woodpellets = await response.data
            }   
            catch (ex) {
                alert(ex.message)
            }
        },

        async getWoodPelletById(id) {
            const url = baseUrl + "/" + id
            try {
                const response = await axios.get(url)
                this.singlewoodpellet = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        async deleteWoodPelletById(idToDelete) {
            const url = baseUrl + "/" + idToDelete
            try {
                response = await axios.delete(url)
                this.deleteMessage = response.status + " " + response.statusText
                this.GetAllWoodPellets()
            } catch (ex) {
                alert(ex.message)
            }
        },
        async addWoodPellet() {
            console.log(this.addData)
            try {
                response = await axios.post(baseUrl, this.addData)
                this.addMessage = "response " + response.status + " " + response.statusText
                this.GetAllWoodPellets()
            } catch (ex) {
                alert(ex.message)
            }
        },
        async updateWoodPellet() {
            console.log(this.updateData)
            const url = baseUrl + "/" + this.idToUpdate
            try {
                response = await axios.put(url, this.updateData)
                this.updateMessage = "response " + response.status + " " + response.statusText
                this.GetAllWoodPellets()
            } catch (ex) {
                alert(ex.message)
            } 
        }
    }
}).mount("#app")