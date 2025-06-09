// Helper Functions
function product_Range(a: number, b: number) {
  let prd = a,
    i = a
  while (i++ < b) prd *= i
  return prd
}

function combinations(n: number, r: number) {
  if (n < r) return 0
  if (n == r || r == 0) return 1
  r = r < n - r ? n - r : r
  return product_Range(r + 1, n) / product_Range(1, n - r)
}

export default (totalRanks = 13, totalSuits = 4, numDecks = 2) => {
  // Total number of possible 5-card poker hands

  const totalHands = combinations(totalRanks * totalSuits * numDecks, 5)

  // Poker Hand Variables
  const fiveOfAKind = {
    name: 'Five of a Kind',
    totalHands,
    count: combinations(totalSuits * numDecks, 5) * totalRanks,
    odds: `1 in ?`,
    rank: 1,
  }

  const royalFlush = {
    name: 'Royal Flush',
    totalHands,
    count:
      Math.pow(combinations(numDecks, 1), 5) * // 10 J Q K A
      combinations(totalSuits, 1), // suits
    odds: `1 in 649,740`,
    rank: 1,
  }

  const straightFlush = {
    name: 'Straight Flush',
    totalHands,
    count:
      Math.pow(combinations(numDecks, 1), 5) * //
      (totalRanks - 4) * //
      totalSuits, //
    odds: '1 in 72,193',
    rank: 2,
  }

  const fourOfAKind = {
    name: 'Four of a Kind',
    totalHands,
    count:
      combinations(totalRanks, 1) *
      combinations(totalSuits * numDecks, 4) * //
      combinations(totalRanks - 1, 1) *
      combinations(totalSuits * numDecks, 1), //
    odds: '1 in 4,165',
    rank: 3,
  }

  const fullHouse = {
    name: 'Full House',
    totalHands,
    count:
      combinations(totalRanks, 1) *
      combinations(totalSuits * numDecks, 3) *
      combinations(totalRanks - 1, 1) *
      combinations(totalSuits * numDecks, 2),
    odds: '1 in 694',
    rank: 4,
  }

  const flush = {
    name: 'Flush',
    totalHands,
    count:
      combinations(totalRanks, 5) * combinations(totalSuits * numDecks, 1) - // total flushes
      royalFlush.count -
      straightFlush.count, // num of straight (royal) flushes
    odds: '1 in 509',
    rank: 5,
  }

  const straight = {
    name: 'Straight',
    totalHands,
    count:
      combinations(totalRanks - 3, 1) * Math.pow(combinations(totalSuits * numDecks, 1), 5) - // total straights
      royalFlush.count -
      straightFlush.count, // num of straight (royal) flushes
    odds: '1 in 255',
    rank: 6,
  }

  const threeOfAKind = {
    name: 'Three of a Kind',
    totalHands,
    count:
      combinations(totalRanks, 1) *
      combinations(totalSuits * numDecks, 3) *
      combinations(totalRanks - 1, 2) *
      Math.pow(combinations(totalSuits * numDecks, 1), 2),
    odds: '1 in 47',
    rank: 7,
  }

  const twoPair = {
    name: 'Two Pair',
    totalHands,
    count:
      combinations(totalRanks, 2) * //any two rank
      Math.pow(combinations(totalSuits * numDecks, 2), 2) * // all pair combinations for both rank
      combinations(totalRanks - 2, 1) * // any one of the remaining rank
      combinations(totalSuits * numDecks, 1), // all combinations
    odds: '1 in 21',
    rank: 8,
  }

  const onePair = {
    name: 'One Pair',
    totalHands,
    count:
      combinations(totalRanks, 1) * //any one rank
      combinations(totalSuits * numDecks, 2) * // all pair combinations for the rank
      combinations(totalRanks - 1, 3) * // any three of the remaining rank
      Math.pow(combinations(totalSuits * numDecks, 1), 3), // all combinations
    odds: '1 in 2.4',
    rank: 9,
  }

  const highCard = {
    name: 'High Card',
    totalHands,
    count:
      totalHands -
      fiveOfAKind.count -
      royalFlush.count -
      straightFlush.count -
      fourOfAKind.count -
      fullHouse.count -
      flush.count -
      straight.count -
      threeOfAKind.count -
      twoPair.count -
      onePair.count,
    // (combinations(totalRanks, 5) - //13C5 = choose 5 distinct ranks
    //   combinations(totalRanks - 3, 1)) * //10C1 = subtract the 10 straight sequences
    // (Math.pow(combinations(totalSuits * numDecks, 1), 5) - //4C1^5 = 4 suits per card → 4^5 suit combinations
    //   combinations(totalSuits * numDecks, 1)), //4C1 = remove the flushes (i.e., all same suit)
    odds: '1 in 1.99',
    rank: 10,
  }
  return [
    fiveOfAKind,
    royalFlush,
    straightFlush,
    fourOfAKind,
    fullHouse,
    flush,
    straight,
    threeOfAKind,
    twoPair,
    onePair,
    highCard,
  ]
}
