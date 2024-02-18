import { PrismaClient } from "@prisma/client";
import Express from "express";

const app = Express();
const port = 8080;
app.use(Express.json());

const prisma = new PrismaClient();

type User = {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
};

app.post("/createUser", async (req, res) => {
    const { username, firstName, lastName, password, email } = req.body;
    const data: User = {
        username,
        firstName,
        lastName,
        password,
        email,
    };
    try {
        const newUser = await prisma.user.create({
            data,
            select: {
                id: true
            }
        });
        res.json({ message: "User created", id: newUser.id });
    } catch (error) {
        res.json({ message: "User creation failed", error: error });
    }
})

app.post("/updateUser/:id", async (req, res) => {
    const { id } = req.params;
    const { username, firstName, lastName, password, email } = req.body;
    const data: User = {
        username,
        firstName,
        lastName,
        password,
        email,
    };
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: parseInt(id)
            },
            data
        });
        res.json({ message: "User updated", id: updatedUser.id });
    } catch (error) {
        res.json({ message: "User update failed", error: error });
    }
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
