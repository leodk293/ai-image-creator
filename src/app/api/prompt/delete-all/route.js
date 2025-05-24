import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db/connectMongoDb";
import Prompt from "@/lib/models/prompts";
import User from "@/lib/models/users";

export const DELETE = async (request) => {
    try {
        const url = new URL(request.url);
        const userId = url.searchParams.get("userId");

        if (!userId) {
            return NextResponse.json(
                { message: "User ID required" },
                { status: 400 }
            );
        }

        await connectMongoDB();

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        const result = await Prompt.deleteMany({ userId: userId });

        return NextResponse.json(
            { 
                message: "All prompts deleted successfully",
                deletedCount: result.deletedCount 
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting all prompts:", error);
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
} 