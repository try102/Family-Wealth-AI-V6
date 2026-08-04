/*

 

Family Wealth AI OS

V6.5.1 Upgrade Build

AI CFO Agent

家庭财富智能分析中心

Financial Health Integration

Compatible with Wealth Engine V6.5

*/

import wealthEngine from "./wealthEngine.js";

const cfoAgent = {

    name:

    "AI CFO Agent V6.5.1 Stable",

    // ======================

    // 初始化

    // ======================

    init(){

        return "AI CFO V6.5 Ready";

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

        const allocationAnalysis =

        wealthEngine.allocationAnalysis(

            assetsAgent,

            investmentAgent

        );

        const financialHealth =

        wealthEngine.financialHealth(

            assetsAgent,

            investmentAgent,

            incomeAgent,

            liabilityAgent

        );

        const score =

        this.calculateScore(

            wealth

        );

        return{

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

            // V6.5 新增

            financialHealth,

            allocation,

            allocationAnalysis,

            scoreAnalysis:

            this.scoreAnalysis(

                wealth

            ),

            advice:

            this.generateAdvice(

                wealth,

                financialHealth

            )

        };

    },

    // ======================

    // 财富评分

    // ======================

    calculateScore(

        wealth

    ){

        let score = 0;

        if(

            wealth.totalAssets > 0

        ){

            score +=20;

        }

        if(

            wealth.totalAssets > 100000

        ){

            score +=10;

        }

        if(

            wealth.totalIncome > 0

        ){

            score +=20;

        }

        if(

            wealth.investmentCount > 0

        ){

            score +=15;

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

            debtRatio < 30

        ){

            score +=20;

        }

        else if(

            debtRatio <50

        ){

            score +=10;

        }

        if(

            wealth.assetCount>=3

        ){

            score +=5;

        }

        return Math.min(

            score,

            100

        );

    },

    // ======================

    // 评分解释

    // ======================

    scoreAnalysis(

        wealth

    ){

        let result=[];

        if(

            wealth.totalAssets>0

        ){

            result.push(

            "✓ 家庭资产已建立"

            );

        }

        if(

            wealth.totalIncome>0

        ){

            result.push(

            "✓ 存在收入来源"

            );

        }

        if(

            wealth.investmentCount>0

        ){

            result.push(

            "✓ 已配置投资资产"

            );

        }

        return result;

    },

    // ======================

    // AI建议

    // ======================

    generateAdvice(

        wealth,

        health

    ){

        let advice=[];

        if(

            wealth.totalAssets===0

        ){

            advice.push(

            "请完善家庭资产信息"

            );

        }

        if(

            health

            &&

            health.debtRatio>50

        ){

            advice.push(

            "家庭负债比例较高，需要关注偿债能力"

            );

        }

        if(

            health

            &&

            health.realEstateRatio>70

        ){

            advice.push(

            "房地产集中度较高，需要提高资产流动性"

            );

        }

        if(

            health

            &&

            health.liquidityRatio<10

        ){

            advice.push(

            "现金比例偏低，建议保持备用资金"

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

            "当前财富结构运行正常"

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
