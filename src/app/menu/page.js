"use client"
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "../../components/menu/MenuItem";
import { useState, useEffect} from "react";
import SceletonBox from "../../components/layout/SceletonBox";

export default function MenuPage() {
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => setCategories(categories))
        })
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => setMenuItems(menuItems));
        })
    }, [])
    return (
        <section className="mt-8">
            {categories?.length > 0 && categories.map(c => (
                <div key={c._id}>
                    <div className="text-center">
                        <SectionHeaders mainHeader={c.name}/>
                    </div>
                    <div className="grid grid-cols-1 mdl:grid-cols-3 gap-4 mt-6 mb-12">
                        {menuItems.filter(item => item.category === c._id).map(item => (
                            <MenuItem key={item._id} {...item}/>
                        ))}
                    </div>

                </div>
            ))}
            {!categories?.length && (
                <div>
                    <div className="text-center">
                        <SectionHeaders mainHeader={"Menu categories"}/>
                    </div>
                    <div className="grid grid-cols-1 mdl:grid-cols-3 gap-4 mt-6 mb-12">
                        <SceletonBox/>
                        <SceletonBox/>
                    </div>
                </div>
            )}
        </section>
    )
}