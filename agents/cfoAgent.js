/*

 

Family Wealth AI OS

V7.0 Final Build

AI CFO Agent

家庭财富智能分析中心

*/

import wealthEngine from "./wealthEngine.js";

const cfoAgent = {

    name:

    "AI CFO Agent V7.0 Final",

    // ======================

    // 初始化

    // ======================

    init(){

        return "AI CFO Ready";

    },

    // ======================

    // 分析

    // ======================

    analyze(

        assetsAgent,

        investmentAgent,

        incomeAgent,

        liabilityAgent

    ){

        let wealth =

        wealthEngine.summary(

            assetsAgent,

            investmentAgent,

            incomeAgent,

            liabilityAgent

        );

        let allocation =

        wealthEngine.allocationAnalysis(

            assetsAgent,

            investmentAgent

        );

        let health =

        wealthEngine.financialHealth(

            assetsAgent,

            investmentAgent,

            incomeAgent,

            liabilityAgent

        );

        let score =

        this.calculateScore(

            wealth,

            health

        );

        return{

            title:

            "AI CFO 家庭财富分析报告",

            ...wealth,

            allocation,

            health,

            wealthScore:

            score,

            advice:

            this.generateAdvice(

                wealth,

                allocation,

                health

            )

        };

    },

    // ======================

    // 财富评分

    // ======================

    calculateScore(

        wealth,

        health

    ){

        let score=0;

        if(

            wealth.totalAssets>0

        ){

            score+=20;

        }

        if(

            wealth.totalIncome>0

        ){

            score+=20;

        }

        if(

            wealth.investmentCount>0

        ){

            score+=15;

        }

        if(

            health.debtRatio<30

        ){

            score+=20;

        }

        else if(

            health.debtRatio<50

        ){

            score+=10;

        }

        if(

            health.liquidityRatio>10

        ){

            score+=15;

        }

        if(score>100){

            score=100;

        }

        return score;

    },

    // ======================

    // AI建议

    // ======================

    generateAdvice(

        wealth,

        allocation,

        health

    ){

        let advice=[];

        if(

            health.realEstateRatio>70

        ){

            advice.push(

            "房地产集中度较高，需要提高资产流动性"

            );

        }

        if(

            health.liquidityRatio<10

        ){

            advice.push(

            "现金比例偏低，建议保持备用资金"

            );

        }

        if(

            health.debtRatio>50

        ){

            advice.push(

            "负债比例较高，需要关注偿债能力"

            );

        }

        if(

            wealth.investmentProfit>0

        ){

            advice.push(

            "投资组合产生正收益，可以继续优化资产配置"

            );

        }

        if(

            wealth.totalIncome>0

        ){

            advice.push(

            "建议保持稳定现金流，提高长期投资比例"

            );

        }

        if(

            advice.length===0

        ){

            advice.push(

            "当前家庭财富结构运行正常"

            );

        }

        return advice;

    },

    // ======================

    // 报告接口

    // ======================

    report(

        assetsAgent,

        investmentAgent,

        incomeAgent,

        liabilityAgent

    ){

        return this.analyze(

            assetsAgent,

            investmentAgent,

            incomeAgent,

            liabilityAgent

        );

    }

};

export default cfoAgent;
