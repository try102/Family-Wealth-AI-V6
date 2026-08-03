/*

Family Wealth AI OS

V6.3.2 Upgrade Build001

Wealth Engine

家庭财富统一总账引擎

Compatible with V6.2 Data

*/

const wealthEngine = {

    name:

    "Wealth Engine V6.3.2 Upgrade",

    // ======================

    // 安全读取

    // ======================

    getSummary(agent){

        if(!agent){

            return {};

        }

        if(agent.summary){

            return agent.summary();

        }

        return {};

    },

    // ======================

    // 财富总览

    // ======================

    summary(

        assetsAgent,

        investmentAgent,

        incomeAgent,

        liabilityAgent

    ){

        let assets =

        this.getSummary(

            assetsAgent

        );

        let investment =

        this.getSummary(

            investmentAgent

        );

        let income =

        this.getSummary(

            incomeAgent

        );

        let liability =

        liabilityAgent

        &&

        liabilityAgent.summary

        ?

        liabilityAgent.summary()

        :

        {};

        let normalAssets =

        Number(

            assets.totalValue || 0

        );

        let investmentAssets =

        Number(

            investment.totalValue || 0

        );

        let totalAssets =

        normalAssets

        +

        investmentAssets;

        let totalLiability =

        Number(

            liability.totalLiability

            ||

            liability.totalValue

            ||

            0

        );

        return {

            totalAssets,

            totalLiability,

            netWorth:

            totalAssets

            -

            totalLiability,

            normalAssets,

            investmentAssets,

            totalIncome:

            Number(

                income.totalIncome

                ||

                income.total

                ||

                0

            ),

            investmentProfit:

            Number(

                investment.profit

                ||

                0

            ),

            assetCount:

            assets.count

            ||

            0,

            investmentCount:

            investment.count

            ||

            0,

            incomeCount:

            income.count

            ||

            0

        };

    },

    // ======================

    // 资产配置

    // ======================

    assetAllocation(

        assetsAgent,

        investmentAgent

    ){

        let result = {};

        if(

            assetsAgent

            &&

            assetsAgent.view

        ){

            assetsAgent.view()

            .forEach(item=>{

                let category =

                item.category

                ||

                "其他";

                if(!result[category]){

                    result[category]=0;

                }

                result[category] +=

                Number(

                    item.value

                    ||

                    0

                );

            });

        }

        if(

            investmentAgent

            &&

            investmentAgent.inventory

        ){

            investmentAgent.inventory()

            .forEach(item=>{

                let category =

                item.type

                ||

                "投资资产";

                if(!result[category]){

                    result[category]=0;

                }

                result[category] +=

                Number(

                    item.marketValue

                    ||

                    0

                );

            });

        }

        return result;

    },

    // ======================

    // V6.3.2

    // 资产配置比例分析

    // ======================

    allocationAnalysis(

        assetsAgent,

        investmentAgent

    ){

        let allocation =

        this.assetAllocation(

            assetsAgent,

            investmentAgent

        );

        let total = 0;

        Object.values(allocation)

        .forEach(value=>{

            total +=

            Number(

                value || 0

            );

        });

        let ratio = {};

        Object.keys(allocation)

        .forEach(key=>{

            ratio[key] =

            total === 0

            ?

            0

            :

            Number(

                (

                allocation[key]

                /

                total

                *

                100

                )

                .toFixed(2)

            );

        });

        return {

            total,

            allocation,

            ratio

        };

    },

    // ======================

    // 所有人配置

    // ======================

    ownerAllocation(

        assetsAgent,

        investmentAgent

    ){

        let result={};

        if(

            assetsAgent

            &&

            assetsAgent.view

        ){

            assetsAgent.view()

            .forEach(item=>{

                let owner =

                item.owner

                ||

                "未分类";

                if(!result[owner]){

                    result[owner]=0;

                }

                result[owner]+=

                Number(

                    item.value

                    ||

                    0

                );

            });

        }

        return result;

    },

    // ======================

    // 国家配置

    // ======================

    countryAllocation(

        assetsAgent,

        investmentAgent

    ){

        let result={};

        if(

            assetsAgent

            &&

            assetsAgent.view

        ){

            assetsAgent.view()

            .forEach(item=>{

                let country =

                item.country

                ||

                "其他";

                if(!result[country]){

                    result[country]=0;

                }

                result[country]+=

                Number(

                    item.value

                    ||

                    0

                );

            });

        }

        return result;

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

        return {

            summary:

            this.summary(

                assetsAgent,

                investmentAgent,

                incomeAgent,

                liabilityAgent

            ),

            allocation:

            this.assetAllocation(

                assetsAgent,

                investmentAgent

            ),

            allocationAnalysis:

            this.allocationAnalysis(

                assetsAgent,

                investmentAgent

            ),

            ownerAllocation:

            this.ownerAllocation(

                assetsAgent,

                investmentAgent

            ),

            countryAllocation:

            this.countryAllocation(

                assetsAgent,

                investmentAgent

            )

        };

    }

};

export default wealthEngine;
