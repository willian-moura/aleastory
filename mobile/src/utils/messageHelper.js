export default {
    formatError : function(error){
        if (error.response){
            return error.response.data.error    
        }
        return "Servidor não disponível"
    }
}