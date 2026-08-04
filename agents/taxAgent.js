/*

 

Family Wealth AI OS

V7.0 Final Build

Tax Agent

家庭税务智能分析中心

*/

const taxAgent = {

    name:

    "Tax Agent V7.0 Final",

    // ======================

    // 初始化

    // ======================

    init(){

        return "Tax Agent Ready";

    },

    // ======================

    // 税务分析

    // ======================

    analyze(

        incomeAgent,

        investmentAgent

    ){

        let income =

        incomeAgent

        &&

        incomeAgent.summary

        ?

        incomeAgent.summary()

        :

        {};

        let investment =

        investmentAgent

        &&

        investmentAgent.summary

        ?

        investmentAgent.summary()

        :

        {};

        let totalIncome =

        Number(

            income.totalIncome || 0

        );

        let investmentProfit =

        Number(

            investment.profit || 0

        );

        let taxableIncome =

        totalIncome

        +

        investmentProfit;

        return{

            totalIncome,

            investmentProfit,

            estimatedTaxBase:

            taxableIncome,

            categories:{

                employment:

                totalIncome,

                investment:

                investmentProfit

            },

            risks:

            this.riskAnalysis(

                totalIncome,

                investmentProfit

            ),

            advice:

            this.advice()

        };

    },

    // ======================

    // 风险分析

    // ======================

    riskAnalysis(

        income,

        profit

    ){

        let result=[];

        if(

            profit>0

        ){

            result.push(

            "投资收益需要关注资本利得税务处理"

            );

        }

        if(

            income===0

        ){

            result.push(

            "暂无收入记录，请完善收入数据"

            );

        }

        if(

            result.length===0

        ){

            result.push(

            "当前税务信息较简单"

            );

        }

        return result;

    },

    // ======================

    // 税务建议

    // ======================

    advice(){

        return[

            "定期整理收入和投资交易记录",

            "区分长期投资收益与普通收入",

            "结合所在国家税务规则进行规划"

        ];

    },

    // ======================

    // 报告接口

    // ======================

    report(

        incomeAgent,

        investmentAgent

    ){

        return this.analyze(

            incomeAgent,

            investmentAgent

        );

    }

};

export default taxAgent;
