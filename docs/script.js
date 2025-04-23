const mortgageCalculator = Vue.createApp({
  data() {
    return {
      form: {
        mortgageAmount: null,
        mortgageTerm: null,
        interestRate: null,
        mortgageType: null
      },
      submitted: false,
      resultVisible: false,
      monthlyRepayments: 0,
      totalRepayment: 0
    };
  },
  computed: {
    formattedMortgageAmount() {
      if (this.form.mortgageAmount === null || this.form.mortgageAmount === "") return "";
      return Number(this.form.mortgageAmount).toLocaleString("en-UK");
    },

    formattedMonthlyRepayments() {
      return this.monthlyRepayments !== null
      ? new Intl.NumberFormat("en-UK", { style: "currency", currency: "GBP" }).format(this.monthlyRepayments)
      : "";

    },

    formattedTotalRepayment() {
      return this.totalRepayment !== null
        ? new Intl.NumberFormat("en-UK", { style: "currency", currency: "GBP" }).format(this.totalRepayment)
        : "";
    }
  },

  methods: {
    // add commas to the thousandth place
    formatMortgageAmount(value) {
      const numericValue = value.replace(/,/g, "");
      const parsed = parseFloat(numericValue);

      if (!isNaN(parsed)) {
        this.form.mortgageAmount = parsed;
      } 
      
      else {
        this.form.mortgageAmount = null;
      }
    },

    calculateRepayments() {
      this.submitted = true;
      this.resultVisible = false;

      const { mortgageAmount, mortgageTerm, interestRate, mortgageType } = this.form;

      if (mortgageAmount && mortgageTerm && interestRate && mortgageType) {
        const mortgageAmountFloat = parseFloat(mortgageAmount);
        const mortgageTermFloat = parseFloat(mortgageTerm);
        const interestRateFloat = parseFloat(interestRate) / 100 / 12;
        const totalPayments = mortgageTerm * 12;

        let monthlyPayments = 0;

        if (mortgageType === "Repayment") {
          monthlyPayments = (mortgageAmountFloat * interestRateFloat) / (1 - Math.pow(1 + interestRateFloat, -totalPayments));
        } 
        
        else {
          monthlyPayments = mortgageAmountFloat * interestRateFloat;
        }

        this.monthlyRepayments = monthlyPayments;
        this.totalRepayment = monthlyPayments * totalPayments;
        this.resultVisible = true;
      }
    },

    clearAll() {
      this.form.mortgageAmount = null;
      this.form.mortgageTerm = null;
      this.form.interestRate = null;
      this.form.mortgageType = null;
      this.submitted = false;
      this.resultVisible = false;
      this.monthlyRepayments = 0;
      this.totalRepayment = 0;
    }
    
  }
});

mortgageCalculator.mount("#mortgageCalculator");

const body = document.querySelector("body");

if (window.matchMedia("max-width: 768px").matches) {
  body.classList.remove("vh-100");
}