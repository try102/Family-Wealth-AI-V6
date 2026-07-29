/*

Family Wealth AI OS

V6.2 Stable

AI CFO Agent

家庭财富智能分析中心

*/

import wealthEngine

from "./wealthEngine.js";

const cfoAgent = {

    name:

    "AI CFO Agent V6.2 Stable",

    // ======================

    // 初始化

    // ======================

    init(){

        return "AI CFO Ready";

    },

    // ======================

    // 财富分析

    // ======================

    analyze(

        assetsAgent,

        investmentAgent,

        incomeAgent,

        liabilityAgent

    ){

        const wealth =

        wealthEngine.summary(

            assetsAgent,

            investmentAgent,

            incomeAgent,

            liabilityAgent

        );

        const allocation =

        wealthEngine.assetAllocation(

            assetsAgent,

            investmentAgent

        );

        const score =

        this.calculateScore(

            wealth

        );

        return {

            title:

            "AI CFO 财富分析报告",

            totalAssets:

            wealth.totalAssets || 0,

            totalLiability:

            wealth.totalLiability || 0,

            netWorth:

            wealth.netWorth || 0,

            totalIncome:

            wealth.totalIncome || 0,

            investmentProfit:

            wealth.investmentProfit || 0,

            investmentCount:

            wealth.investmentCount || 0,

            assetCount:

            wealth.assetCount || 0,

            wealthScore:

            score,

            allocation,

            advice:

            this.generateAdvice(

                wealth

            )

        };

    },

    // ======================

    // 财富评分

    // ======================

    calculateScore(wealth){

        let score=0;

        if(

            wealth.totalAssets>0

        ){

            score+=20;

        }

        if(

            wealth.totalAssets>100000

        ){

            score+=10;

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

        let debtRatio =

        wealth.totalAssets>0

        ?

        (

            wealth.totalLiability

            /

            wealth.totalAssets

            *

            100

        )

        :

        0;

        if(

            debtRatio<30

        ){

            score+=25;

        }

        else if(

            debtRatio<50

        ){

            score+=15;

        }

        if(

            wealth.assetCount>=3

        ){

            score+=10;

        }

        return Math.min(

            score,

            100

        );

    },

    // ======================

    // AI建议

    // ======================

    generateAdvice(wealth){

        let advice=[];

        if(

            wealth.totalAssets===0

        ){

            advice.push(

                "请完善家庭资产信息"

            );

        }

        let debtRatio =

        wealth.totalAssets>0

        ?

        (

            wealth.totalLiability

            /

            wealth.totalAssets

            *

            100

        )

        :

        0;

        if(

            debtRatio>50

        ){

            advice.push(

                "家庭负债率较高，需要关注偿债能力"

            );

        }

        if(

            wealth.investmentCount>0

            &&

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

                "当前财富结构运行正常"

            );

        }

        return advice;

    },

    // ======================

    // 对外报告接口

    // ======================

    report(

        assetsAgent,

        incomeAgent,

        investmentAgent,

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
