import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db/connectMongoDb";
import Prompt from "@/lib/models/prompts";
import User from "@/lib/models/users";

export const POST = async (request) => {
    try {
        await connectMongoDB();
        const { content, model, userId } = await request.json();

        if (!content || !model || !userId) {
            return NextResponse.json(
                { message: "Some infos are missing" },
                { status: 400 }
            );
        }

        const userExits = await User.findById(userId);
        if (!userExits) {
            return NextResponse.json(
                { message: "Author not found" },
                { status: 404 }
            );
        }

        const newPrompt = await Prompt.create({
            content,
            model,
            userId
        });

        return NextResponse.json(
            { message: 'Prompt created successfully', prompt: newPrompt },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating prompt:", error);
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

export const GET = async (request) => {
    try {
        await connectMongoDB();
        const url = new URL(request.url);
        const userId = url.searchParams.get("userId");

        if (!userId) {
            return NextResponse.json(
                { message: "User ID required" },
                { status: 400 }
            );
        }

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // Query prompts directly with userId filter instead of filtering in memory
        const prompts = await Prompt.find({ userId: userId });
        return NextResponse.json(prompts);

    } catch (error) {
        console.error("Error fetching prompts:", error);
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

export const DELETE = async (request) => {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get("id");
        const userId = url.searchParams.get("userId");

        if (!id) {
            return NextResponse.json(
                { message: "Prompt ID not found" },
                { status: 400 }
            );
        }

        if (!userId) {
            return NextResponse.json(
                { message: "User ID required" },
                { status: 401 }
            );
        }

        await connectMongoDB();

        const prompt = await Prompt.findById(id);

        if (!prompt) {
            return NextResponse.json(
                { message: "Prompt not found" },
                { status: 404 }
            );
        }

        await Prompt.findByIdAndDelete(id);

        return NextResponse.json(
            { message: "Prompt deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting prompt:", error);
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }

}