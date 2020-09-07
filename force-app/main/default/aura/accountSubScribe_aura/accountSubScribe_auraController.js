({
    handleChanged: function(cmp, message, helper) {
        if (message != null) {
            if(message.getParam("recordId") != null){
                cmp.set("v.accountid", message.getParam("recordId"));
            }
            if(message.getParam("recordData")){
                cmp.set("v.recordmessage", message.getParam("recordData").value);
            }
        }
    }
})