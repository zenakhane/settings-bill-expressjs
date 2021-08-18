let assert = require("assert");
let countAllFromPaarl = require("../test/settings-bill");



describe('Setting with bill', function() {
    it('Should be able to set call cost ', function() {
        let settingsBill = BillWithSettings();
        settingsBill.setCallCost(1.85)
        assert.equal(1.85, settingsBill.getCallCost())

        settingsBill.setCallCost(2.75)
        assert.equal(2.75, settingsBill.getCallCost())
    })
    it('Should be able to set the sms cost', function() {
        let settingsBill2 = BillWithSettings();
        settingsBill2.setSmsCost(0.85)
        assert.equal(0.85, settingsBill2.getSmsCost())
        settingsBill2.setSmsCost(0.75)
        assert.equal(0.75, settingsBill2.getSmsCost())
    })
    it('Should be able to set the warning level ', function() {
        let settingsBill2 = BillWithSettings();
        settingsBill2.setWarninglevel(20)
        assert.equal(20, settingsBill2.getWarningLevel())
        settingsBill2.setWarninglevel(30)
        assert.equal(30, settingsBill2.getWarningLevel())
    })
    it('Should be able to set the critical level ', function() {
        let settingsBill2 = BillWithSettings();
        settingsBill2.setCriticallevel(25)
        assert.equal(25, settingsBill2.getCriticalLevel())
        settingsBill2.setCriticallevel(35)
        assert.equal(35, settingsBill2.getCriticalLevel())
    })

})

describe('use values', function() {
    it('Should be able to use the call cost set at R2.25', function() {
        let settingsBill = BillWithSettings();

        settingsBill.setCallCost(2.25)
        settingsBill.setSmsCost(0.85)

        settingsBill.makeCall()
        settingsBill.makeCall()
        settingsBill.makeCall()

        assert.equal(6.75, settingsBill.getTotalCost())
        assert.equal(6.75, settingsBill.getTotalCallCost())
        assert.equal(0.00, settingsBill.getTotalSmsCost())
    })
    it('Should be able to use the call cost set for 2 calls at R1.35 ', function() {
        let settingsBill = BillWithSettings();

        settingsBill.setCallCost(1.35)
        settingsBill.setSmsCost(0.85)

        settingsBill.makeCall()
        settingsBill.makeCall()

        assert.equal(2.70, settingsBill.getTotalCost())
        assert.equal(2.70, settingsBill.getTotalCallCost())
        assert.equal(0.00, settingsBill.getTotalSmsCost())
    })
    it("Should be able to send 2 sms's at R0.85 each  ", function() {
        let settingsBill = BillWithSettings();


        settingsBill.setSmsCost(0.85)

        settingsBill.sendSms()
        settingsBill.sendSms()

        assert.equal(1.70, settingsBill.getTotalCost())
        assert.equal(0.00, settingsBill.getTotalCallCost())
        assert.equal(1.70, settingsBill.getTotalSmsCost())
    })
})

describe('warning & critical level', function() {
    it('Should return a class name of "warning "if warning level is reached', function() {
        let settingsBill = BillWithSettings()

        settingsBill.setCallCost(1.35)
        settingsBill.setSmsCost(0.85)
        settingsBill.setWarninglevel(5)

        settingsBill.makeCall()
        settingsBill.makeCall()
        settingsBill.makeCall()
        settingsBill.makeCall()

        assert.equal('warning', settingsBill.totalClassName())
    })
    it('Should return a class name of "critical" if critical level is reached', function() {
        let settingsBill = BillWithSettings()

        settingsBill.setCallCost(2.50)
        settingsBill.setSmsCost(0.85)
        settingsBill.setCriticallevel(10)

        settingsBill.makeCall()
        settingsBill.makeCall()
        settingsBill.makeCall()
        settingsBill.makeCall()
        settingsBill.sendSms()


        assert.equal("danger", settingsBill.totalClassName())
    })
})
