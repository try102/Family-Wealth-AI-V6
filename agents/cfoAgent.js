/*

Family Wealth AI OS

V6.0 Development Build001

AI CFO Agent

家庭财富智能分析中心

*/

import wealthEngine

from "./wealthEngine.js";

const cfoAgent = {

    name:

    "AI CFO Agent V6.0",

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

        const health =

        wealthEngine.healthSummary(

            wealth

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

            wealth.totalAssets,

            totalLiability:

            wealth.totalLiability,

            netWorth:

            wealth.netWorth,

            totalIncome:

            wealth.totalIncome,

            investmentProfit:

            wealth.investmentProfit,

            debtRatio:

            wealth.debtRatio,

            wealthScore:

            score,

            health,

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

        // 资产基础

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

        // 收入能力

        if(

            wealth.totalIncome>0

        ){

            score+=20;

        }

        // 投资能力

        if(

            wealth.investmentCount>0

        ){

            score+=15;

        }

        // 负债健康

        if(

            wealth.debtRatio<30

        ){

            score+=25;

        }

        else if(

            wealth.debtRatio<50

        ){

            score+=15;

        }

        // 完整性

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

                "请先完善家庭资产信息"

            );

        }

        if(

            wealth.debtRatio>50

        ){

            advice.push(

                "家庭负债率较高，需要关注偿债能力"

            );

        }

        if(

            wealth.investmentCount>0

            &&

            wealth.investmentProfit<0

        ){

            advice.push(

                "投资组合当前存在亏损，需要关注风险控制"

            );

        }

        if(

            wealth.totalIncome>0

        ){

            advice.push(

                "建议持续提高储蓄率和长期投资比例"

            );

        }

        if(

            advice.length===0

        ){

            advice.push(

                "当前财富结构运行正常，可以进一步优化资产配置"

            );

        }

        return advice;

    },

    // ======================

    // 对外接口

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
