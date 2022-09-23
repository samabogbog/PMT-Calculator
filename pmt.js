var slide_range = document.querySelectorAll(".slide-range");
var result_value = document.getElementById("result_value");

var amount_range = document.getElementById('amount_range');
var amount_range_value = document.getElementById('amount_range_value');
var time_range = document.getElementById('time_range');
var time_range_value = document.getElementById('time_range_value');
var interest_range = document.getElementById('interest_range');
var interest_range_value = document.getElementById('interest_range_value');
var result_value = document.getElementById('result_value');

var total_paid_value = document.getElementById('total_paid_value');
var graph_interest = document.getElementById('graph_interest');
var graph_pay = document.getElementById('graph_pay');

var table = document.getElementById('table');

var result;
for(i=0; i<slide_range.length; i++) {
    slide_range[i].addEventListener("input", event => {

        function PMT(rate, nperiod, pv, fv, type) {
            if (!fv) fv = 0;
            if (!type) type = 0;

            if (rate == 0) return -(pv + fv)/nperiod;

            var pvif = Math.pow(1 + rate, nperiod);
            var pmt = rate / (pvif - 1) * -(pv * pvif + fv);

            if (type == 1) {
                pmt /= (1 + rate);
            };
            return pmt;
        }

        amount_range_value.value = parseInt(amount_range.value).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
        time_range_value.value = parseInt(time_range.value).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
        interest_range_value.value = parseFloat(interest_range.value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + '%';

        result = PMT(interest_range.value/100/12 , time_range.value*12 , -amount_range.value, 0, 0);
        result_value.innerText = '฿ ' + result.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});

        var amount = parseInt(amount_range.value);
        var total_paid = result*time_range_value.value*12;
        var total_interest = total_paid-amount;

        var pay_ratio = (amount / total_paid * 100).toFixed(2);
        var interest_ratio = (total_interest / total_paid * 100).toFixed(2);

        total_paid_value.innerText = '฿ ' + total_paid.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
        graph_pay.innerText = "เงินต้น " + amount.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) + ' (' + pay_ratio + '%)';
        graph_interest.innerText = "ดอกเบี้ย " + total_interest.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) + ' (' + interest_ratio + '%)';

        graph_pay.style.width = parseFloat(pay_ratio) + 0.15 + '%';
        graph_interest.style.width = parseFloat(interest_ratio) + 0.05 + '%';
    })

    var btn = document.getElementById('btn');
    btn.addEventListener('click', event => {

        var amt = parseInt((amount_range_value.value).replace(/[^0-9]/g,''));
        var itr = parseFloat(interest_range_value.value);

        table.innerHTML = '';
        for(i=0; i<time_range_value.value*12; i++) {
            
            _irt = (amt * (itr/100)) / 12;
            _pay = result - _irt;

            table.innerHTML += '<div class=\"flex-container"> \
                                    <div class=\"flex-20\">'+ (i + 1) + '</div> \
                                    <div class=\"flex-20\ blue">'+ result.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1}) +'</div> \
                                    <div class=\"flex-20\ green">' + _pay.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1}) + '</div> \
                                    <div class=\"flex-20\ red">' + _irt.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1}) + '</div> \
                                    <div class=\"flex-20\ orange">' + Math.abs(amt - _pay).toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1}) + '</div> \
                                </div>';
            amt -= _pay;
        }
    })
}