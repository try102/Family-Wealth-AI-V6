/*

 

Family Wealth AI OS

V7.0 Final Build

AI Advisor

家庭财富智能顾问

*/

import wealthEngine from "../agents/wealthEngine.js";

const advisor = {

    name:

    "AI Wealth Advisor V7.0 Final",

    // ======================

    // 初始化

    // ======================

    init(){

        return "Advisor Ready";

    },

    // ======================

    // 财富诊断

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

        let health =

        wealthEngine.financialHealth(

            assetsAgent,

            investmentAgent,

            incomeAgent,

            liabilityAgent

        );

        let result={

            title:

            "家庭财富AI诊断报告",

            summary:{

                netWorth:

                wealth.netWorth || 0,

                totalAssets:

                wealth.totalAssets || 0,

                totalLiability:

                wealth.totalLiability || 0,

                annualIncome:

                wealth.totalIncome || 0

            },

            strengths:[],

            risks:[],

            advice:[]

        };

        // ======================

        // 优势分析

        // ======================

        if(

            wealth.netWorth > 0

        ){

            result.strengths.push(

                "家庭净资产为正，财富基础良好"

            );

        }

        if(

            wealth.totalIncome > 0

        ){

            result.strengths.push(

                "存在稳定收入来源"

            );

        }

        if(

            wealth.investmentProfit > 0

        ){

            result.strengths.push(

                "投资组合产生正收益"

            );

        }

        // ======================

        // 风险分析

        // ======================

        if(

            health.realEstateRatio > 70

        ){

            result.risks.push(

                "房地产资产占比较高，流动性需要关注"

            );

            result.advice.push(

                "建议逐步增加现金及金融资产比例"

            );

        }

        if(

            health.liquidityRatio < 10

        ){

            result.risks.push(

                "现金储备比例偏低"

            );

            result.advice.push(

                "建议保持6-12个月生活备用资金"

            );

        }

        if(

            health.debtRatio > 50

        ){

            result.risks.push(

                "家庭负债比例较高"

            );

            result.advice.push(

                "建议优化负债结构"

            );

        }

        if(

            health.investmentRatio < 10

        ){

            result.advice.push(

                "建议提高长期投资资产配置"

            );

        }

        // ======================

        // 默认建议

        // ======================

        if(

            result.advice.length===0

        ){

            result.advice.push(

                "当前家庭财富结构运行健康"

            );

        }

        return result;

    },

    // ======================

    // 简易报告

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

export default advisor;
