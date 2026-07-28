/*

Family Wealth AI OS

V6.0 Development Build001

Wealth Engine

家庭财富统一计算核心

*/

const wealthEngine = {

    name:

    "Wealth Engine V6.0",

    // ======================

    // 财富总览

    // ======================

    summary(

        assetsAgent,

        investmentAgent,

        incomeAgent,

        liabilityAgent

    ){

        const assets =

        assetsAgent.summary();

        const investment =

        investmentAgent.summary();

        const income =

        incomeAgent.summary();

        const liability =

        liabilityAgent

        ?

        liabilityAgent.summary()

        :

        {

            totalLiability:0,

            count:0

        };

        const normalAssets =

        Number(

            assets.totalValue || 0

        );

        const investmentAssets =

        Number(

            investment.totalValue || 0

        );

        const totalAssets =

        normalAssets

        +

        investmentAssets;

        const totalLiability =

        Number(

            liability.totalLiability || 0

        );

        const netWorth =

        totalAssets

        -

        totalLiability;

        const debtRatio =

        totalAssets > 0

        ?

        Number(

            (

                totalLiability

                /

                totalAssets

                *

                100

            ).toFixed(2)

        )

        :

        0;

        return {

            totalAssets,

            totalLiability,

            netWorth,

            debtRatio,

            normalAssets,

            investmentAssets,

            totalIncome:

            Number(

                income.totalIncome || 0

            ),

            investmentProfit:

            Number(

                investment.profit || 0

            ),

            assetCount:

            assets.count || 0,

            liabilityCount:

            liability.count || 0,

            investmentCount:

            investment.count || 0,

            incomeCount:

            income.count || 0

        };

    },

    // ======================

    // 资产配置分析

    // ======================

    assetAllocation(

        assetsAgent,

        investmentAgent

    ){

        const result={};

        assetsAgent.view()

        .forEach(item=>{

            const key =

            item.category || "其他";

            if(!result[key]){

                result[key]=0;

            }

            result[key]+=

            Number(

                item.value || 0

            );

        });

        investmentAgent.view()

        .forEach(item=>{

            const key =

            item.type || "投资";

            if(!result[key]){

                result[key]=0;

            }

            result[key]+=

            Number(

                investmentAgent.marketValue(item)

                ||

                0

            );

        });

        return result;

    },

    // ======================

    // 财富健康

    // ======================

    healthSummary(summary){

        let level = "优秀";

        if(summary.debtRatio>60){

            level="高风险";

        }

        else if(summary.debtRatio>40){

            level="偏高";

        }

        else if(summary.debtRatio>20){

            level="正常";

        }

        return {

            debtRatio:

            summary.debtRatio,

            debtLevel:

            level

        };

    },

    // ======================

    // 完整报告

    // ======================

    report(

        assetsAgent,

        investmentAgent,

        incomeAgent,

        liabilityAgent

    ){

        const summary =

        this.summary(

            assetsAgent,

            investmentAgent,

            incomeAgent,

            liabilityAgent

        );

        return {

            summary,

            allocation:

            this.assetAllocation(

                assetsAgent,

                investmentAgent

            ),

            health:

            this.healthSummary(

                summary

            )

        };

    }

};

export default wealthEngine;
