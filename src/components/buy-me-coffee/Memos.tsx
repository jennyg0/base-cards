import MemoCard from './MemoCard';
import type { CoffeeMemo } from '../../types';

type MemosProps = {
  memos: CoffeeMemo[];
};

/**
 * Memos received from coffee purchases in BuyMeACoffee smart contract.
 * https://github.com/alchemyplatform/RTW3-Week2-BuyMeACoffee-Contracts/blob/main/contracts/BuyMeACoffee.sol#L28C18-L29C1
 * @param memos List of memos.
 */
function Memos({ memos }: MemosProps) {
  if (!memos) return null;
  return (
    <div className="flex flex-col justify-start gap-3">
      {memos
        .map((memo) => {
          return (
            <MemoCard
              key={memo.time.toString()}
              userName={memo.userName}
              message={memo.message}
              time={memo.time}
            />
          );
        })
        .reverse()}
    </div>
  );
}

export default Memos;
