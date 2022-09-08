import {connectToDatabase} from "../../lib/dbConnect";
import {ObjectId} from "mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const survey = {
        dream: req.body.dream,
        dreamId: req.body.dreamId,
        county: req.body.county,
        coach: req.body.coach,
        priority: req.body.priority,
        food: req.body.food,
        money: req.body.money,
        substances: req.body.substances,
        mentalHealth: req.body.mentalHealth,
        safety: req.body.safety,
        healthInsurance: req.body.healthInsurance,
        transportation: req.body.transportation,
        disabilities: req.body.disabilities,
        lifeSkills: req.body.lifeSkills,
        employment: req.body.employment,
        legal: req.body.legal,
        childcare: req.body.childcare,
        adultEducation: req.body.adultEducation,
        parentingSkills: req.body.parentingSkills,
        childrensEducation: req.body.childrensEducation,
        communityInvolvement: req.body.communityInvolvement,
        familyFriendsSupport: req.body.familyFriendsSupport,
        budgeting: req.body.budgeting,
        racismBigotry: req.body.racismBigotry,
        internetAccess: req.body.internetAccess,
        housing: req.body.housing,
        userId: req.body.userId,
        datestamp: new Date(),
        surprise: req.body.surprise,
        concern: req.body.concern,
        family: req.body.family,
        health: req.body.health,
        income: req.body.income
    }

    const reporting = {
        dream: req.body.dream,
        dreamId: req.body.dreamId,
        county: req.body.county,
        coach: req.body.coach,
        priority: req.body.priority,
        food: req.body.food[0],
        money: req.body.money[0],
        substances: req.body.substances[0],
        mentalHealth: req.body.mentalHealth[0],
        safety: req.body.safety[0],
        healthInsurance: req.body.healthInsurance[0],
        transportation: req.body.transportation[0],
        disabilities: req.body.disabilities[0],
        lifeSkills: req.body.lifeSkills[0],
        employment: req.body.employment[0],
        legal: req.body.legal[0],
        childcare: req.body.childcare[0],
        adultEducation: req.body.adultEducation[0],
        parentingSkills: req.body.parentingSkills[0],
        childrensEducation: req.body.childrensEducation[0],
        communityInvolvement: req.body.communityInvolvement[0],
        familyFriendsSupport: req.body.familyFriendsSupport[0],
        budgeting: req.body.budgeting[0],
        racismBigotry: req.body.racismBigotry[0],
        internetAccess: req.body.internetAccess[0],
        housing: req.body.housing[0],
        userId: req.body.userId,
        datestamp: new Date(),
        surprise: req.body.surprise,
        concern: req.body.concern,
        family: req.body.family,
        health: req.body.health,
        income: req.body.income
    }

    const {db} = await connectToDatabase()
    const LAS = await db
        .collection("lifeAreaSurveys")
        .insertOne(survey)

    const reportingSet = await db
        .collection("lasReporting")
        .insertOne(reporting)

    const dreamUpdate = await db
        .collection("dreams")
        .updateOne(
            {_id: ObjectId(req.body.dreamId)},
            {
                $set: {survey}
            }
        )

    res.json(LAS, dreamUpdate, reportingSet)

}
