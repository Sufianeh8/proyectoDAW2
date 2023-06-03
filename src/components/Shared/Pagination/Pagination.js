import { useRouter } from "next/router";
import styles from "./Pagination.module.scss";
import { Pagination as PaginationSU } from "semantic-ui-react";

export function Pagination(props) {

    const {totalPages} = props;
    const router = useRouter();

    const onPageChange = (_, data) => {
        const {activePage} = data;

        router.replace({query: {...router.query, page: activePage} });
    }

  return (
    <div className={styles.container}>
        <PaginationSU 
            totalPages={totalPages} 
            ellipsisItem={null} 
            firstItem={null} 
            lastItem={null} 
            onPageChange={onPageChange} />
    </div>
  )
}
