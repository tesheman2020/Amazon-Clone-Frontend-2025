import React from "react";
import { categoryInfos } from "./catagoryFullInfos";
import CategoryCard from "./CategoryCard";
import classes from "./category.module.css";
function Category() {
  return (
    <section className={classes.category__container}>
      {categoryInfos.map((infos, index) => {
        return<CategoryCard key={index} data={infos} />
      })}
      {/* {categoryInfos.map((info, index) => (
        <CategoryCard key={index} data={info} />
      ))} */}
    </section>
  );
}

export default Category;
