module.exports = function BillWithSettings() {
    var theCallCost = 0
    var theSmsCost = 0
    var theWarningLevel = 0
    var theCriticalLevel
    var callCostTotal = 0
    var smsCostTotal = 0

    function setCallCost(callCost) {
        theCallCost = callCost

    }

    function getCallCost() {
        return theCallCost

    }

    function setSmsCost(smsCost) {
        theSmsCost = smsCost

    }

    function getSmsCost() {
        return theSmsCost

    }

    function getAllCosts(bill){
        if(bill === "call"){
            makeCall();
        }if (bill === "sms"){
            sendSms();

        }
    }

    function setWarninglevel(warningLevel) {
        theWarningLevel = warningLevel
    }

    function getWarningLevel() {
        return theWarningLevel
    }

    function setCriticallevel(criticalLevel) {
        theCriticalLevel = criticalLevel
    }

    function getCriticalLevel() {
        return theCriticalLevel
    }

    function makeCall() {
        if (!hasReachedCriticalLevel()) {
            callCostTotal += theCallCost
        }

    }

    function getTotalCost() {
        return callCostTotal + smsCostTotal

    }

    function getTotalCallCost() {
        return callCostTotal
    }

    function getTotalSmsCost() {
        return smsCostTotal

    }

    function sendSms() {
        if (!hasReachedCriticalLevel()) {
            smsCostTotal += theSmsCost
        }

    }

    function hasReachedCriticalLevel() {
        return getTotalCost() >= getCriticalLevel()
    }

    function totalClassName() {
        if (getTotalCost() >= getCriticalLevel()) {
            return "danger"
        }
       
        if (getTotalCost() >= getWarningLevel()) {
            return "warning"
        }
      

    }

    return {
        setCallCost,
        getCallCost,
        setSmsCost,
        getSmsCost,
        setWarninglevel,
        getWarningLevel,
        setCriticallevel,
        getCriticalLevel,
        makeCall,
        getTotalCost,
        getTotalCallCost,
        getTotalSmsCost,
        sendSms,
        totalClassName,
        getAllCosts
    }
}