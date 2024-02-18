const category = {
    FIRST: "FIRST",
    SECOND: "SECOND",
    THIRD: "THIRD",
    FOURTH: "FOURTH",
    FIFTH: "FIFTH",
    SIXTH: "SIXTH",
    SEVENTH: "SEVENTH"
}

class Card {
    constructor(id, category, question, answer, tag) {
        this.id = id;
        this.category = category;
        this.question = question;
        this.answer = answer;
        this.tag = tag;
    }

    // Create a function to check if the user's answer is correct, and if so, update the card's category
    checkAnswer(userAnswer) {
        const isAnswerCorrect = userAnswer === this.answer;

        if (isAnswerCorrect) {
            // Get the categories
            const categories = Object.keys(category);
            const currentIndex = categories.indexOf(this.category);

            this.category = currentIndex < categories.length - 1 ? categories[currentIndex + 1] : undefined;
        } else {
            this.category = category.FIRST;
        }
    }
}

describe('Card Service', () => {

    it('Should create a card', async () => {
        const card = new Card("1", "FIRST", "What is the first question?", "This is the first answer", "Testing Tag");
        expect(card).toBeDefined();
    });

    it('Should return the card category', async () => {
        const card = new Card("1", "FIRST", "What is the first question?", "This is the first answer", "Testing Tag");
        expect(card.category).toBe("FIRST");
    });

    it('Should return the card question', async () => {
        const card = new Card("1", "FIRST", "What is the first question?", "This is the first answer", "Testing Tag");
        expect(card.question).toBe("What is the first question?");
    });

    it('Should update the card category when the user successfully answers the question', async () => {
        const card = new Card("1", "FIRST", "What is the first question?", "This is the first answer", "Testing Tag");
        const userAnwser = "This is the first answer";

        card.checkAnswer(userAnwser);
        expect(card.category).toBe("SECOND");
    });

    it('Should update the card category to FIRST when the user fails to answer the question', async () => {
        const card = new Card("1", "FIRST", "What is the first question?", "This is the first answer", "Testing Tag");
        const userAnwser = "This is not the first answer";

        card.checkAnswer(userAnwser);
        expect(card.category).toBe("FIRST");
    });

    it('Should remove the card from the database when the category hits SEVENTH', async () => {
        const card = new Card("1", "SEVENTH", "What is the seventh question?", "This is the seventh answer", "Testing Tag");
        const userAnwser = "This is the seventh answer";

        card.checkAnswer(userAnwser);
        expect(card.category).toBe(undefined);
    });

})