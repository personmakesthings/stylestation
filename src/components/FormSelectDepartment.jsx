// DATABASE CONNECTION
import { db } from "@/utils/db"


// COMPONENT
export default async function FormSelectDepartment({action}) {

    // GET DEPARTMENTS FROM DATABASE
    const departmentsData = (await db.query(
        `
        SELECT * FROM wk12_departments
        `
    )).rows

    return (
            <div>
                <form action={action}>
                <label htmlFor="department"><p className="center-align">Select Department</p></label>
                <div className="select-and-submit">
                    <select name="department" id="department" defaultValue="0" required>
                        <option value="0">View All</option>
                        {departmentsData.map((department)=>{
                            return (
                                <option value={department.id}>
                                    {department.gender}
                                </option>
                            )
                        })}
                    </select>
                    <button type="submit" className="small-btn submit">Go</button>
                </div>
                </form>
            </div>
    )
}